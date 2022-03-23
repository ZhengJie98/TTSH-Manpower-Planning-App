import sqlite3
from sqlite3 import Error


def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return conn



def create_leave_application(conn, leave_application):
    
    sql = ''' INSERT INTO leave_application(application_id,applicant_id,leave_start_date,leave_end_date,leave_am_pm_both,leave_reason, leave_application_timestamp, leave_number_of_days,leave_approved)
            VALUES(?,?,?,?,?,?,?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, leave_application)
    conn.commit()



database = r".\website\pythonsqlite.db"

# create a database connection
conn = create_connection(database)
with conn:
    
    leave_application_1 = ('1','1353654','123321','1353654','123321','1353654','123321','1353654','123321');
    leave_application_2 = ('2','1353655','123321','1353654','123321','1353654','123321','1353654','123321');
    leave_application_list = (leave_application_1,leave_application_2)
    # print("leave_application_1: ", leave_application_1)
    for each in leave_application_list:
        print(each)
        create_leave_application(conn,each)

    # # tasks
    # task_1 = ('Analyze the requirements of the app', 1, 1, project_id, '2015-01-01', '2015-01-02')
    # task_2 = ('Confirm with user about the top requirements', 1, 1, project_id, '2015-01-03', '2015-01-05')

    # # create tasks
    # create_task(conn, task_1)
    # create_task(conn, task_2)
