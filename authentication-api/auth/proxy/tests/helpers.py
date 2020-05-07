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
            "url": "",
            "subject": "biology",
            "grade": "eighth grade"
        },
        {
            "uuid": "544de826-3f04-45e0-a44a-6f548c7e0aba",
            "name": "Chemistry Lesson",
            "description": "Organic acids",
            "pdf_file": "",
            "url": "",
            "subject": "chemistry",
            "grade": "eighth grade"
        },
        {
            "uuid": "e71433ab-ff0d-4e3b-8aa6-5e9fb7b96469",
            "name": "History",
            "description": "II World War",
            "pdf_file": "",
            "url": "",
            "subject": "history",
            "grade": "eighth grade"
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
    "url": "",
    "subject": "biology",
    "grade": "eighth grade"
}
"""

TESTS_API_LIST_RESPONSE = """
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "uuid": "34fde577-2360-4dd9-8aa3-a0d32b799336",
      "lesson_uuid": "cf48df3b-ae86-464e-acd7-6cdca498fa8a",
      "questions": [
        {
          "uuid": "95639f83-9600-4637-903a-c5b08d2f4e7c",
          "question_type": "binary",
          "content": "Voluptate repellat ut deserunt?",
          "choices": [
            {
              "answer": "totam",
              "correct": True
            },
            {
              "answer": "est",
              "correct": False
            }
          ]
        }
      ]
    }
  ]
}
"""

TESTS_API_DETAIL_RESPONSE = """
{
  "uuid": "34fde577-2360-4dd9-8aa3-a0d32b799336",
  "lesson_uuid": "cf48df3b-ae86-464e-acd7-6cdca498fa8a",
  "questions": [
    {
      "uuid": "95639f83-9600-4637-903a-c5b08d2f4e7c",
      "question_type": "binary",
      "content": "Voluptate repellat ut deserunt?",
      "choices": [
        {
          "answer": "totam",
          "correct": True
        },
        {
          "answer": "est",
          "correct": False
        }
      ]
    }
  ]
}
"""

CREATE_LESSON_DATA = {
    "name": "Test lesson",
    "description": "Test description",
    "pdf_file": "",
    "url": "https://some-url.com",
    "subject": "biology",
    "grade": "eighth grade",
}

UPDATE_LESSON_DATA = {
    "name": "Test lesson new",
    "description": "New description",
    "pdf_file": "",
    "url": "https://some-url-new.com",
    "subject": "biology",
    "grade": "eighth grade",
}

CREATE_TEST_DATA = {
    "lesson_uuid": "cd6ba3e0-edac-43ff-b9c9-a6ced23fedc4",
    "questions": [
        {
            "question_type": "binary",
            "content": "Is DNA double helix?",
            "choices": [{"answer": "yes", "correct": True}, {"answer": "no", "correct": False}],
        },
    ],
}


UPDATE_TEST_DATA = {
    "lesson_uuid": "cd6ba3e0-edac-43ff-b9c9-a6ced23fedc4",
    "questions": [
        {
            "uuid": "cd6ba3e0-edac-43ff-b9c9-a6ced23fedgh",
            "_delete": False,
            "question_type": "binary",
            "content": "New question",
            "choices": [{"answer": "Yes", "correct": True}, {"answer": "No", "correct": False}],
        }
    ],
}
