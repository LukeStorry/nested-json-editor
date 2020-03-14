export default [
  {
    title: "Grandparent 1",
    text: "Grandparent 1 description.",
    children: [
      {
        title: "Parent 1",
        children: []
      },
      {
        title: "Parent 2",
        children: [
          {
            title: "First Child",
            text: "I am the first child",
            children: []
          },
          {
            title: "Second Child",
            text: "I am the second child",
            children: []
          }
        ]
      }
    ]
  },
  {
    title: "Grandparent 2",
    text: "Grandparent 2 description.",
    children: [
      {
        title: "Parent 3",
        children: [
          {
            title: "Third Child",
            text: "I am the third child",
            children: []
          },
          {
            title: "Fourth Child",
            text: "I am the fourth child",
            children: []
          }
        ]
      }
    ]
  }
];
