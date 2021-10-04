export const logoName = "";
export const apiURL = "https://seg-api.diginsights.com/suresmile2021/score";
export const baseName = "sure-smile-typing-tool";
export const documentationURL = "https://digclients.com/api_docs/suresmile2021/#introduction";

export default [
    {
      id: 1,
      title: "Sure Smile Survey Part 1",
      description:
        "Please indicate how stronly you AGREE or DISAGREE with the following statements.",
      questions: [
        {
          hasError: false,
          name: "dig_var1",
          title:
            "Outward appearances are not as important as who you are on the inside"
        }
      ],
      options: [
        {
          label: "Agree Strongly",
          value: 1
        },
        {
          label: "Agree Somewhat",
          value: 2
        },
        {
          label: "Neither Agree nor Disagree",
          value: 3
        },
        {
          label: "Disagree Somewhat",
          value: 4
        },
        {
          label: "Disagree Strongly",
          value: 5
        }
      ]
    },

    {
      id: 2,
      title: "Sure Smile Survey Part 2",
      description:
        "Treatment with Clear Aligners can be managed through in-person visits to your dentist/orthodontist or can be done entirely from home with or without seeing a dental specialist through an online provider who ships directly to you. Which kind of Clear Aligner treatment are you considering?",
      questions: [
        {
          hasError: false,
          name: "dig_var15",
          title: "Treatment with Clear Aligners can be managed through in-person visits to your dentist/orthodontist or can be done entirely from home with or without seeing a dental specialist through an online provider who ships directly to you. Which kind of Clear Aligner treatment are you considering?"
        }
      ],
      options: [
        {
          label: "An in-person dentist-managed Clear Aligner treatment",
          value: 1
        },
        {
          label: "An at-home Clear Aligner treatment (including teledentistry visits or not)",
          value: 2
        },
        {
          label: "Both",
          value: 3
        },
        {
          label: "I am not considering any Clear Aligner treatment.",
          value: 4
        }
      ]
    },
  ]


















  //old



//   export const logoName = "";
// export const apiURL = "https://seg-api.diginsights.com/suresmile2021/score";
// export const baseName = "sure-smile-typing-tool";
// export const documentationURL = "https://digclients.com/api_docs/suresmile2021/#introduction";

// export default [
//     {
//       id: 1,
//       title: "Sure Smile Survey Part 1",
//       description:
//         "Please indicate how stronly you AGREE or DISAGREE with the following statements.",
//       questions: [
//         {
//           hasError: false,
//           name: "dig_var1",
//           title:
//             "Outward appearances are not as important as who you are on the inside"
//         },
//         // {
//         //   hasError: false,
//         //   name: "dig_var2",
//         //   title: "I feel overwhelmed by financial burdens"
//         // },
//         // {
//         //   hasError: false,
//         //   name: "dig_var3",
//         //   title: "I love being the “first” to try new products or technologies"
//         // },
//         // {
//         //   hasError: false,
//         //   name: "dig_var4",
//         //   title: "I always check several sources before making a significant purchase"
//         // },
//         // {
//         //   hasError: false,
//         //   name: "dig_var5",
//         //   title:
//         //     "I rely heavily on the opinion of others to decide on brands or products to buy"
//         // },
//         // {
//         //   hasError: false,
//         //   name: "dig_var6",
//         //   title: "I like to take control of things in my life"
//         // },
//         // {
//         //   hasError: false,
//         //   name: "dig_var7",
//         //   title:
//         //     "I look for the lowest possible prices when making larger purchases"
//         // },
//         // {
//         //   hasError: false,
//         //   name: "dig_var8",
//         //   title:
//         //     "It is important to invest time or money into taking good care of myself"
//         // },
//         // {
//         //   hasError: false,
//         //   name: "dig_var9",
//         //   title:
//         //     "I think people who do things to try and change their appearance are 'superficial'"
//         // },
//         // {
//         //   hasError: false,
//         //   name: "dig_var10",
//         //   title:
//         //     "I feel uncomfortable when I’m around other people who have bad teeth"
//         // },
//         // {
//         //   hasError: false,
//         //   name: "dig_var11",
//         //   title:
//         //     "I enjoy going to the dentist"
//         // },
//         // {
//         //   hasError: false,
//         //   name: "dig_var12",
//         //   title:
//         //     "Going to the dentist scares me"
//         // },
//         // {
//         //   hasError: false,
//         //   name: "dig_var13",
//         //   title:
//         //     "Taking good care of your teeth can have a positive impact on your health overall"
//         // },
//         // {
//         //   hasError: false,
//         //   name: "dig_var14",
//         //   title:
//         //     "Straight teeth indicate a person has good oral health."
//         // }
//       ],
//       options: [
//         {
//           label: "Agree Strongly",
//           value: 1
//         },
//         {
//           label: "Agree Somewhat",
//           value: 2
//         },
//         {
//           label: "Neither Agree nor Disagree",
//           value: 3
//         },
//         {
//           label: "Disagree Somewhat",
//           value: 4
//         },
//         {
//           label: "Disagree Strongly",
//           value: 5
//         }
//       ]
//     },

//     {
//       id: 2,
//       title: "Sure Smile Survey Part 2",
//       description:
//         "Treatment with Clear Aligners can be managed through in-person visits to your dentist/orthodontist or can be done entirely from home with or without seeing a dental specialist through an online provider who ships directly to you. Which kind of Clear Aligner treatment are you considering?",
//       questions: [
//         {
//           hasError: false,
//           name: "dig_var15",
//           title: "Treatment with Clear Aligners can be managed through in-person visits to your dentist/orthodontist or can be done entirely from home with or without seeing a dental specialist through an online provider who ships directly to you. Which kind of Clear Aligner treatment are you considering?"
//         }
//       ],
//       options: [
//         {
//           label: "An in-person dentist-managed Clear Aligner treatment",
//           value: 1
//         },
//         {
//           label: "An at-home Clear Aligner treatment (including teledentistry visits or not)",
//           value: 2
//         },
//         {
//           label: "Both",
//           value: 3
//         },
//         {
//           label: "I am not considering any Clear Aligner treatment.",
//           value: 4
//         }
//       ]
//     },
//   ]

