// src/data/ui-components.ts

// Define the UI component type
export interface UIComponent {
  id: number;
  title: string;
  category: string;
  tech: string;
  imageDark: string;
  imageLight: string;
  link?: string;
  flow: {
    input: string;
    process: string;
    output: string;
  };
  codeHighlight: {
    title: string;
    code: string;
  };
  metrics: {
    label: string;
    value: string;
    description: string;
  };
}

// UI Components data
export const uiComponents: UIComponent[] = [
  {
    id: 1,
    title: "Component Placeholder",
    category: "Category Placeholder",
    tech: "Tech Stack Placeholder",
    imageDark: "",
    imageLight: "",
    link: "",
    flow: {
      input: "Placeholder text for input",
      process: "Placeholder text for process",
      output: "Placeholder text for output",
    },
    codeHighlight: {
      title: "Code Highlight Title",
      code: "// Placeholder code\nconsole.log('Hello World');",
    },
    metrics: {
      label: "Metric Label",
      value: "Metric Value",
      description: "Metric Description",
    },
  },
  {
    id: 2,
    title: "Component Placeholder",
    category: "Category Placeholder",
    tech: "Tech Stack Placeholder",
    imageDark: "",
    imageLight: "",
    link: "",
    flow: {
      input: "Placeholder text for input",
      process: "Placeholder text for process",
      output: "Placeholder text for output",
    },
    codeHighlight: {
      title: "Code Highlight Title",
      code: "// Placeholder code\nconsole.log('Hello World');",
    },
    metrics: {
      label: "Metric Label",
      value: "Metric Value",
      description: "Metric Description",
    },
  },
  {
    id: 3,
    title: "Component Placeholder",
    category: "Category Placeholder",
    tech: "Tech Stack Placeholder",
    imageDark: "",
    imageLight: "",
    link: "",
    flow: {
      input: "Placeholder text for input",
      process: "Placeholder text for process",
      output: "Placeholder text for output",
    },
    codeHighlight: {
      title: "Code Highlight Title",
      code: "// Placeholder code\nconsole.log('Hello World');",
    },
    metrics: {
      label: "Metric Label",
      value: "Metric Value",
      description: "Metric Description",
    },
  },
  {
    id: 4,
    title: "Component Placeholder",
    category: "Category Placeholder",
    tech: "Tech Stack Placeholder",
    imageDark: "",
    imageLight: "",
    link: "",
    flow: {
      input: "Placeholder text for input",
      process: "Placeholder text for process",
      output: "Placeholder text for output",
    },
    codeHighlight: {
      title: "Code Highlight Title",
      code: "// Placeholder code\nconsole.log('Hello World');",
    },
    metrics: {
      label: "Metric Label",
      value: "Metric Value",
      description: "Metric Description",
    },
  },
  {
    id: 5,
    title: "Component Placeholder",
    category: "Category Placeholder",
    tech: "Tech Stack Placeholder",
    imageDark: "",
    imageLight: "",
    link: "",
    flow: {
      input: "Placeholder text for input",
      process: "Placeholder text for process",
      output: "Placeholder text for output",
    },
    codeHighlight: {
      title: "Code Highlight Title",
      code: "// Placeholder code\nconsole.log('Hello World');",
    },
    metrics: {
      label: "Metric Label",
      value: "Metric Value",
      description: "Metric Description",
    },
  },
  {
    id: 6,
    title: "Component Placeholder",
    category: "Category Placeholder",
    tech: "Tech Stack Placeholder",
    imageDark: "",
    imageLight: "",
    link: "",
    flow: {
      input: "Placeholder text for input",
      process: "Placeholder text for process",
      output: "Placeholder text for output",
    },
    codeHighlight: {
      title: "Code Highlight Title",
      code: "// Placeholder code\nconsole.log('Hello World');",
    },
    metrics: {
      label: "Metric Label",
      value: "Metric Value",
      description: "Metric Description",
    },
  },
  {
    id: 7,
    title: "Component Placeholder",
    category: "Category Placeholder",
    tech: "Tech Stack Placeholder",
    imageDark: "",
    imageLight: "",
    link: "",
    flow: {
      input: "Placeholder text for input",
      process: "Placeholder text for process",
      output: "Placeholder text for output",
    },
    codeHighlight: {
      title: "Code Highlight Title",
      code: "// Placeholder code\nconsole.log('Hello World');",
    },
    metrics: {
      label: "Metric Label",
      value: "Metric Value",
      description: "Metric Description",
    },
  },
];
