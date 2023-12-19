import sqlite3
import logging

logger = logging.getLogger(__name__)

database_path = 'database.db'


def get_cursor_connection():
    global database_path
    connection = sqlite3.connect(database_path)
    cursor = connection.cursor()
    return cursor, connection


def create_database_if_not_exists():
    cursor, connection = get_cursor_connection()
    global database_path

    cursor.execute(f"ATTACH DATABASE '{database_path}' AS database_alias;")
    connection.commit()
    connection.close()
    logger.info('ATTACHED')


def create_table_slots():
    cursor, connection = get_cursor_connection()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS
            slots (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TIMESTAMP NOT NULL,
                url STRING NOT NULL,
                filter STRING default ORIGINAL
            )
        ;
    ''')

    connection.commit()
    logger.info('TABLE signals created successfully')


def run_migrations():
    create_database_if_not_exists()
    create_table_slots()
