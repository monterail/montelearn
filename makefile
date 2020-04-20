run:
	docker-compose -f docker-compose-proxy.yml up -d

cleanup:
	docker-compose -f docker-compose-proxy.yml down

lesson_api_superuser:
	docker-compose -f docker-compose-proxy.yml run lesson-api python manage.py createsuperuser

auth_api_superuser:
	docker-compose -f docker-compose-proxy.yml run auth-api python manage.py createsuperuser

lesson_load_data:
	docker-compose -f docker-compose-proxy.yml run lesson-api python manage.py loaddata lesson.json --app lesson.lesson
