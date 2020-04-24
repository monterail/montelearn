LESSON_API_LIST_RESPONSE = """
{
    "count": 3,
    "next": null,
    "previous": null,
    "results": [
        {
            "uuid": "00981f5a-6685-4589-ad77-6a7e2a70ed9d",
            "name": "Biology Lesson",
            "description": "DNA",
            "pdf_file": "",
            "url": ""
        },
        {
            "uuid": "544de826-3f04-45e0-a44a-6f548c7e0aba",
            "name": "Chemistry Lesson",
            "description": "Organic acids",
            "pdf_file": "",
            "url": ""
        },
        {
            "uuid": "e71433ab-ff0d-4e3b-8aa6-5e9fb7b96469",
            "name": "History",
            "description": "II World War",
            "pdf_file": "",
            "url": ""
        }
    ]
}
"""

LESSON_API_DETAIL_RESPONSE = """
{
    "uuid": "00981f5a-6685-4589-ad77-6a7e2a70ed9d",
    "name": "Biology Lesson",
    "description": "DNA",
    "pdf_file": "",
    "url": ""
}
"""

TESTS_API_LIST_RESPONSE = """
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [
     {
      "uuid": "cd6ba3e0-edac-43ff-b9c9-a6ced23fedc4",
      "subject": "Science",
      "question_type": "binary",
      "question": "Is math related to science?",
      "choices": [
        {
          "answer": "Yesn't",
          "correct": false
        },
        {
          "answer": "Non't",
          "correct": true
        }
      ]
    }
  ]
}
"""

TESTS_API_DETAIL_RESPONSE = """
{
  "uuid": "cd6ba3e0-edac-43ff-b9c9-a6ced23fedc4",
  "subject": "Science",
  "question_type": "binary",
  "question": "Is math related to science?",
  "choices": [
    {
      "answer": "Yesn't",
      "correct": false
    },
    {
      "answer": "Non't",
      "correct": true
    }
  ]
}
"""
