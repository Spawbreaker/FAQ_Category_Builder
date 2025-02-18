import * as parser from "@babel/parser";
import generator from "@babel/generator";

export default function loadFaqs(file, callback) {
  const reader = new FileReader();
  reader.readAsText(file);

  reader.onload = () => {
    const data = reader.result?.toString();
    let faqNodes = [];

    const ast = parser.parse(data || "", {
      sourceType: "module",
      plugins: ["jsx"],
    });

    // Find the export declaration for 'faqs', where we expect it to be
    const exportNode = ast.program.body.find(
      (node) => node.type === "ExportNamedDeclaration"
    );
    if (!exportNode) {
      console.error("No export found for faqs");
      return;
    }

    exportNode.declaration?.declarations?.forEach((declaration) => {
      if (
        declaration.id.type === "Identifier" &&
        declaration.id.name === "faqs"
      ) {
        faqNodes = declaration.init?.elements;
      }
    });

    const faqs = faqNodes.map((node) => {
      return node.properties.reduce(
        (acc, property) => {
          if (property.key.name === "id") {
            acc.id = property.value.value;
          } else if (property.key.name === "question") {
            const { code } = generator(property.value);
            acc.question = code.replace(/[(\<\>)|(\<\/\>)]/g, "");
          } else if (property.key.name === "answer") {
            const { code } = generator(property.value);
            acc.answer = code.replace(/[(\<\>)|(\<\/\>)]/g, "");;
          }
          return acc;
        },
        { id: 0, question: "", answer: "" }
      );
    });

    callback(faqs);
  };
}
