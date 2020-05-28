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

TESTS_STUDENT_LIST_RESPONSE = """
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
              "answer": "totam"
            },
            {
              "answer": "est"
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

TESTS_STUDENT_DETAIL_RESPONSE = """
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
          "answer": "totam"
        },
        {
          "answer": "est"
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


GRADE_LIST_RESPONSE = """
{
  "count": 3,
  "next": null,
  "previous": null,
  "results": [
    {
      "uuid": "ed85f108-2e27-442d-8d24-d2fd6d07a357",
      "name": "first grade"
    },
    {
      "uuid": "409f7284-d5d2-4b9c-95ff-9cfca917b979",
      "name": "high school"
    },
    {
      "uuid": "2979a117-ded1-4ba7-a767-e25422ec3a3d",
      "name": "seventh grade"
    }
  ]
}
"""

GRADE_DETAIL_RESPONSE = """
{
    "uuid": "ed85f108-2e27-442d-8d24-d2fd6d07a357",
    "name": "first grade"
}
"""

SUBJECT_LIST_RESPONSE = """
{
  "count": 3,
  "next": null,
  "previous": null,
  "results": [
    {
      "uuid": "a8b2a9fa-5c75-4598-9046-b6b56fed936e",
      "name": "biology"
    },
    {
      "uuid": "4afb06dc-6e55-4056-a65b-55209f2ad0c1",
      "name": "chemistry"
    },
    {
      "uuid": "0a8ad2a7-9a59-4f0b-a566-162aa7aa3628",
      "name": "history"
    }
  ]
}
"""

SUBJECT_DETAIL_RESPONSE = """
{
    "uuid": "a8b2a9fa-5c75-4598-9046-b6b56fed936e",
    "name": "biology"
}
"""

TESTS_SCORE_RESPONSE = {
    "score": "1/1",
    "results": [{"question_uuid": "b3c17cb6-6196-4554-821b-702eb3e35c88", "correct": True}],
}

TESTS_SCORE_DATA = {
    "answers": [
        {"question_uuid": "b3c17cb6-6196-4554-821b-702eb3e35c88", "selected_choices": ["Non't"]}
    ]
}
