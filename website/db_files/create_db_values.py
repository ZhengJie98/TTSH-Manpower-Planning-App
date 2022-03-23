import sqlite3
from sqlite3 import Error
import datetime;
time_now = datetime.datetime.now()


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


def create_employee(conn, employee):
    sql = ''' INSERT INTO employee_details(employee_name,employee_position,employee_password)
              VALUES(?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, employee)
    conn.commit()
    # return cur.lastrowid

def create_leave_application(conn, leave_application):
    
    sql = ''' INSERT INTO leave_application(application_id, applicant_name, approver_name, leave_start_date,leave_end_date,leave_am_pm_both,leave_reason, leave_application_timestamp, leave_number_of_days, leave_application_status, leave_approved_timestamp)
            VALUES(?,?,?,?,?,?,?,?,?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, leave_application)
    conn.commit()

def create_admin(conn, admin):
    
    sql = ''' INSERT INTO admin(employee_name)
            VALUES(?) '''
    cur = conn.cursor()
    cur.execute(sql, admin)
    conn.commit()

# def create_task(conn, task):
#     """
#     Create a new task
#     :param conn:
#     :param task:
#     :return:
#     """

#     sql = ''' INSERT INTO tasks(name,priority,status_id,project_id,begin_date,end_date)
#               VALUES(?,?,?,?,?,?) '''
#     cur = conn.cursor()
#     cur.execute(sql, task)
#     conn.commit()
#     return cur.lastrowid


def main():
    database = r".\website\pythonsqlite.db"

    # create a database connection
    conn = create_connection(database)
    with conn:
        # create a employee_details
        employee1 = ('Ong Zheng Jie', 'Registrar', 'password123');
        employee2 = ('Chee Jay Sian', 'Consultant', 'password456');
        employee3 = ('123', 'Medical Officer', '123');
        employee4 = ('Boon Kai', 'Medical Officer', '123');
        employee_list = (employee1,employee2,employee3,employee4)
        for employee in employee_list:
            create_employee(conn,employee)


        
        # create leave applications
        leave_application_1 = ('1','Chee Jay Sian', 'inserted_row', '2022/03/12','2022/03/20','BOTH','sample_reason',time_now,'2','PENDING',time_now);
        leave_application_2 = ('2','Chee Jay Sian', 'inserted_row','2022/03/01','2022/03/01','AM','sample_reason',time_now,'2','APPROVED', time_now);
        leave_application_3 = ('3','Ong Zheng Jie', 'inserted_row','2022/03/01','2022/03/12','PM','sample_reason',time_now,'2','APPROVED', time_now);
        leave_application_4 = ('4','123', 'inserted_row','2022/03/01','2022/03/25','PM','sample_reason',time_now,'2','APPROVED', time_now);
        leave_application_5 = ('5','Boon Kai', 'inserted_row','2022/03/01','2022/03/25','PM','sample_reason',time_now,'2','APPROVED', time_now);
        leave_application_list = (leave_application_1,leave_application_2, leave_application_3,leave_application_4,leave_application_5)
        # print("leave_application_1: ", leave_application_1)
        for each in leave_application_list:
            # print(each)
            create_leave_application(conn,each)



        # create admins    
        admin_1 = ('Ong Zheng Jie',);
        admin_2 = ('Chee Jay Sian',);
        admin_list = (admin_1,admin_2)

        for each in admin_list:
            # print(each)
            create_admin(conn,each)


        # # tasks
        # task_1 = ('Analyze the requirements of the app', 1, 1, project_id, '2015-01-01', '2015-01-02')
        # task_2 = ('Confirm with user about the top requirements', 1, 1, project_id, '2015-01-03', '2015-01-05')

        # # create tasks
        # create_task(conn, task_1)
        # create_task(conn, task_2)


if __name__ == '__main__':
    main()


