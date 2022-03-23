from email.mime import application
from flask import Flask, Blueprint, render_template, redirect, url_for, request, session, flash, jsonify
from datetime import datetime, timedelta
import pandas
import datetime
from . import db
import sqlite3
import os
import jyserver.Flask as jsf
import json

max_consultant_leave = 5
max_registrar_leave = 5
max_medical_officer_leave = 5

auth = Blueprint('auth', __name__)




@auth.route('/') # login page when you enter the site
def index():  

    return render_template('login.html')
    


@auth.route('/login', methods=['POST', 'GET']) # POST request to authenticate user
def login():
    # print(url_for('auth.login'))

    if request.method == 'POST' and request.form['submit_button'] =="Login":
        # print("LOGIN BUTTON IS PRESSED")

        # print(request.form['submit_button'])
        user = request.form['employee_name']
        password = request.form['employee_password']
        # print(user)
        # print(password)
    
        # print("Employee ID is :", user)

        ## CONNECT DATABASE     
        currentdirectory = os.path.dirname(os.path.abspath(__file__))
        # print("NOW WE ARE IN:" , currentdirectory)
        # connect_directory = connect_directory = os.path.join(currentdirectory, 'pythonsqlite.db')

        connect_directory = os.path.join(currentdirectory, 'pythonsqlite.db')
        print(connect_directory)
        # print(connect_directory)
        connection = sqlite3.connect(connect_directory)
        cursor = connection.cursor()

        
        ## CHECK IF Employee ID EXIST
        query = "SELECT EXISTS (SELECT * FROM employee_details WHERE employee_name =?)"
        result = cursor.execute(query, (user,))
        row = result.fetchall()
        value_exist = row[0][0]
        # print(value_exist)

        if (value_exist == 1):

            ## CHECK IF PASSWORD IS SAME
            query1 = "SELECT employee_password FROM employee_details WHERE employee_name = ?"
            # query1 = "SELECT * FROM employee_details WHERE employee_email = ?"
            # user_email = "zjong.2019@scis.smu.edu.sg"
            # print(query1)
            result = cursor.execute(query1, (user,))
            row = result.fetchall()
            password_returned = row[0][0]
            # print(password_returned)

            if (password == password_returned):
                
                query_employee = "SELECT * FROM employee_details WHERE employee_name = ?"
                # print(query1)
                result = cursor.execute(query_employee, (user,))
                row = result.fetchall()
                # print(row[0])
                session['user_information'] = row[0] # storing information in the session
                # print("session VARIABLE:", session['user_information'])
                user_information = session['user_information']
                # print(type(user_information))
                user_information = json.dumps(row[0])
                # print(type(user_information))
                
                user_information = json.loads(user_information)
                # print(user_information)
                # print(type(user_information))

                query_admin = "SELECT EXISTS (SELECT * FROM admin WHERE employee_name =?)"
                result = cursor.execute(query_admin, (user,))
                row = result.fetchall()
                value_exist = row[0][0]
                session['is_admin'] = value_exist
                # print("USER IS ADMIN??:", value_exist)

                ## for leave_approval to not show
                session['still_in_leave_approval'] = 0

                # return render_template('profile.html')
                return redirect(url_for('auth.calendar'))
                # return redirect(url_for('auth.profile', user=user)) # routes to calendar of user upon successful authentication
            
            else:
                # flash("wrong user_id or password")
                # session["wrong"] = "wronger"
                return render_template('login.html',login_details="True")
        
        ## ASK JUSTIN WHATS THIS
        # elif 'user' in session:
        #     flash('Already Logged In!')
        #     return redirect(url_for('auth.profile'))

        ## If user_id doesn't exist, go back login.html
        else:    
            # flash("wrong user_id or password")
            return render_template('login.html', login_details="True")

    elif request.method == 'POST' and request.form['submit_button'] =="Signup":
        return render_template('signup.html')


@auth.route('/signup', methods=['POST', 'GET']) 
def signup():
    # print("SIGNUP BUTTON IS PRESSED")
    if request.method == 'POST':        
        
        # employee_id = request.form['employee_id']
        employee_name = request.form['employee_name']
        employee_position = request.form['employee_position']
        # employee_email = request.form['employee_email']
        # employee_phone = request.form['employee_phone']
        employee_password = request.form['employee_password']
        tuple_of_employee_details = (employee_name,employee_position,employee_password)


        
        # # print("employee_id is :", employee_id)
        # print("employee_name is :", employee_name)
        # print("employee_position is :", employee_position)
        # # print("employee_email is :", employee_email)
        # # print("employee_phone is :", employee_phone)
        # print("employee_password is :", employee_password)
        
        
        
       
        
        

        ## CONNECT DATABASE     
        currentdirectory = os.path.dirname(os.path.abspath(__file__))
        # print("NOW WE ARE IN:" , currentdirectory)
        connect_directory = connect_directory = os.path.join(currentdirectory, 'pythonsqlite.db')

        # print(connect_directory)
        connection = sqlite3.connect(connect_directory)
        cursor = connection.cursor()

        ## Check if employee_name is unique in DB
        query = "SELECT EXISTS (SELECT * FROM employee_details WHERE employee_name =?)"
        result = cursor.execute(query, (employee_name,))
        row = result.fetchall()
        value_exist = row[0][0]
        # print("employee_name exists:", value_exist)

        if value_exist ==1:
            return render_template('signup.html',employee_name_exists="True")


        ## IF GOT EMPTY FIELDS, TELL THEM TO FILL IN AGAIN
        for each in tuple_of_employee_details:
            if each == '':
                return render_template('signup.html', details_not_filled = True, employee_name=employee_name,employee_position=employee_position,employee_password=employee_password)


        ## INSERT VALUES INTO DATABASE
        sql = """INSERT INTO employee_details(employee_name,employee_position,employee_password)
                VALUES(?,?,?)"""

        cursor.execute(sql, tuple_of_employee_details)
        connection.commit()

        # print("insert successful")
        return render_template('login.html', signup_completed= True)

    return render_template('signup.html')


@auth.route('/user') # should be routed properly to user's profile
def user():
    if 'user' in session: # prevents people from logging in simply from modifying the url 
        user = session['user']
        return render_template('profile.html', user=user)
    else: # show this if not logged in
        flash('You are not logged in!')
        return redirect(url_for('auth.login'))



@auth.route('/logout')
def logout(): # removes sessions on logout
    flash('Successfully logged out!', 'info') # flash a message showing logout is successful
    session.pop('user', None)
    return redirect(url_for('auth.login'))


@auth.route('/profile')
def profile():
    
    user_information = session['user_information']
    

    return render_template('profile.html', user_information=user_information)





@auth.route('/calendar', methods=['POST', 'GET'])
def calendar():
    # print("max_consultant_leave :", max_consultant_leave)   
        
    # print(session['user_information'])
    applicant_name = session['user_information'][0]
    approver_name = session['user_information'][0]
    applicant_position = session['user_information'][1] 

    ## Retrieve list of values for leave approved
    currentdirectory = os.path.dirname(os.path.abspath(__file__))
    connect_directory = connect_directory = os.path.join(currentdirectory, 'pythonsqlite.db')

    connection = sqlite3.connect(connect_directory)
    cursor = connection.cursor()

    
    ## OBTAIN LEAVE APPLICATIONS
    query = "SELECT * FROM leave_application"
    # query = "SELECT json_group_object(employee_name, json_object('employee_position',employee_position,'employee_password',employee_password)) AS json_result FROM (SELECT * FROM employee_details)"
    result = cursor.execute(query)
    rows = result.fetchall()
    leave_applications = rows
   
    ## OBTAIN Employee Details

    query = "SELECT employee_name, employee_position FROM employee_details"
    result = cursor.execute(query)
    rows = result.fetchall()
    employee_details = rows
    # print(employee_details)

    ## BOON KAI CODE (approve leave)
    query = '''SELECT * 
            FROM leave_application 
            LEFT JOIN employee_details
                ON employee_details.employee_name = leave_application.applicant_name'''
    result = cursor.execute(query)
    leave_application_rows = result.fetchall()
    
    ## my_leaves table
    query = '''SELECT * 
            FROM leave_application 
            LEFT JOIN employee_details 
                ON employee_details.employee_name = leave_application.applicant_name
                WHERE applicant_name = ?'''
    result = cursor.execute(query,(applicant_name,))
    my_leaves_rows = result.fetchall()
    # print(my_leaves_rows)

    if request.method == 'POST' and request.form['submit_button'] =="Save":        
        
        print("SAVE BUTTON IS PRESSED")
        ## CONNECT DATABASE     
        currentdirectory = os.path.dirname(os.path.abspath(__file__))
        connect_directory = connect_directory = os.path.join(currentdirectory, 'pythonsqlite.db')

        connection = sqlite3.connect(connect_directory)
        cursor = connection.cursor()
        query = "SELECT COUNT(*) FROM leave_application"
        result = cursor.execute(query)
        row = result.fetchone()
        
        application_id = row[0] + 1
        # print(application_id)
        applicant_name = session['user_information'][0]
        approver_name = 'nonamefornow'
        
        leave_start_date_raw = request.form['leaveStart']
        leave_end_date_raw = request.form['leaveEnd']
        leave_start_date = request.form['leaveStart'].replace("-","/")
        leave_end_date = request.form['leaveEnd'].replace("-","/")
        
        ## Get Dates INBETWEEN
        dates_inbetween_pandas = pandas.date_range(start=leave_start_date_raw,end=leave_end_date_raw)
        dates_inbetween=[]
        for each_date in dates_inbetween_pandas:
            each_date = each_date.date().strftime("%Y/%m/%d")
            dates_inbetween.append(each_date)
        

        leave_am_pm_both = request.form['leaveType']
        leave_reason = request.form['leave_reason_remarks']
        leave_application_timestamp = datetime.datetime.now()
        leave_number_of_days = len(dates_inbetween)
        leave_application_status = "APPROVED"
        leave_approved_timestamp = datetime.datetime.now()
        approver_name = "SYSTEM"
        
        

        # print('================================')
        print(leave_start_date)
        print(leave_end_date)
        # print(request.form['auto_approve_pass_to_python'])
        auto_approve_list = request.form['auto_approve_pass_to_python']
        # auto_approve_list = auto_approve_list[1:-1]
        auto_approve_list = auto_approve_list.split(',')
        # print("auto_approve_list: ",auto_approve_list)
        # print(type(auto_approve_list))       
        
        ##  Auto Approval Function
        # def auto_approval(dates_inbetween, auto_approve_list, applicant_position):
        if applicant_position == "Consultant":
            max_leaves = max_consultant_leave
        elif applicant_position == "Registrar":
            max_leaves = max_registrar_leave
        elif applicant_position == "Medical Officer":
            max_leaves = max_medical_officer_leave
        
        ## IF >MAX ALLOWED LEAVES, WILL CHANGE STATUS TO PENDING
        print("auto_approve_list:", auto_approve_list)
        for am_pm_checker in auto_approve_list:
            # print("daily_position_leave_count: ",int(float(daily_position_leave_count))+1)
            # print(type(int(daily_position_leave_count)))
            print(am_pm_checker)
            if int(float(am_pm_checker)) + 1 > max_leaves:
                # print("============== ACTIVATED ====================")
                leave_application_status = "PENDING"
                approver_name = "NA"
                leave_approved_timestamp = "NA"
                break
                           

        # print(leave_approved) 

        
        tuple_of_application_details = (application_id,applicant_name, approver_name, leave_start_date,leave_end_date,leave_am_pm_both,leave_reason,leave_application_timestamp,leave_number_of_days,leave_application_status,leave_approved_timestamp)


        sql = ''' INSERT INTO leave_application(application_id, applicant_name, approver_name, leave_start_date,leave_end_date,leave_am_pm_both,leave_reason, leave_application_timestamp, leave_number_of_days, leave_application_status, leave_approved_timestamp)
            VALUES(?,?,?,?,?,?,?,?,?,?,?) '''

        cursor = connection.cursor()

        cursor.execute(sql, tuple_of_application_details)
        connection.commit()

        query = "SELECT * FROM leave_application"
        result = cursor.execute(query)
        rows = result.fetchall()
        leave_applications = rows
        # print(leave_applications)

        # return render_template('calendar.html', leave_applications = leave_applications, employee_details = employee_details, applicant_name=applicant_name,is_admin = session['is_admin'])
        # return redirect(url_for('auth.calendar', leave_applications = leave_applications, employee_details = employee_details, applicant_name=applicant_name,is_admin = session['is_admin']))
        return redirect(url_for('auth.calendar'))

    # print("BEFORE APPROVA DENY SESSION VARIABLE: ", session['still_in_leave_approval'])
    # print("BEFORE APPROVE DENY REQUEST FORM FROM HIDDEN FIELD:", request.form['close_leave_approval_final'])
    
    if request.method == 'POST' and (request.form['submit_button']=="Approve" or request.form['submit_button']=="Deny"): # change variables accordingly
        """
        update leave_application_status of a leave_application
        :param conn: Connection object
        :param update_table_sql: an UPDATE TABLE statement
        :return: 
        """
        print("WE ARE IN BOONKAI's CODE")
        if request.form['submit_button'] == "Approve":
            leave_applcation_status = "APPROVED"
        elif request.form['submit_button'] == "Deny":
            leave_applcation_status = "DENIED"

        sql = ''' UPDATE leave_application
                    SET approver_name = ?,
                        leave_application_status = ?,
                        leave_approved_timestamp = ? 
                    WHERE application_id = ?'''
        
        # approve_or_decline = request.form['submit_button']
        # print(approve_or_decline)
        application_id = request.form['application_id'].split()[1]
        # print(application_id)
        
        approver_name = approver_name
        leave_approved_timestamp = datetime.datetime.now()
        
        tuple_of_approval_details = (approver_name, leave_applcation_status, leave_approved_timestamp, application_id)
        cur = connection.cursor()
        cur.execute(sql, (tuple_of_approval_details))
        connection.commit()
        return redirect(url_for('auth.calendar'))

        # print("SESSION VARIABLE: ", session['still_in_leave_approval'])
        # session['still_in_leave_approval'] = 1
        # print("SESSION VARIABLE: ", session['still_in_leave_approval'])
        # print("REQUEST FORM FROM HIDDEN FIELD:", request.form['close_leave_approval_final'])
        # print(session['still_in_leave_approval'])

        # print(type(request.form['close_leave_approval_final']))
        # if request.form['close_leave_approval_final'] == '0':
        #     print("RESETTING STLLL_IN_LEAVE_APPROVAL")
        #     session['still_in_leave_approval'] = 0
        #     print(session['still_in_leave_approval'])

    

    # cursor = connection.cursor()
    # query = '''SELECT * 
    #         FROM leave_application 
    #         LEFT JOIN employee_details
    #             ON employee_details.employee_name = leave_application.applicant_name'''
    # result = cursor.execute(query)
    # leave_application_rows = result.fetchall()
    # print(leave_application_rows)


    return render_template('calendar.html', my_leaves_rows=my_leaves_rows, leave_application_rows=leave_application_rows, still_in_leave_approval = session['still_in_leave_approval'],leave_applications = leave_applications, employee_details = employee_details, applicant_name=applicant_name,is_admin = session['is_admin'])
    # return redirect(url_for('auth.calendar', leave_applications = leave_applications, employee_details = employee_details, applicant_name=applicant_name,is_admin = session['is_admin']))



@auth.route('/leave_approval_page', methods=['POST', 'GET']) #do i need both POST & GET? or just leave that out?
def leave_approval_page():

    ## CONNECT DATABASE     
    currentdirectory = os.path.dirname(os.path.abspath(__file__))
    connect_directory = connect_directory = os.path.join(currentdirectory, 'pythonsqlite.db')

    connection = sqlite3.connect(connect_directory)
    cursor = connection.cursor()
    query = '''SELECT * 
            FROM leave_application 
            LEFT JOIN employee_details
                ON employee_details.employee_name = leave_application.applicant_name'''
    result = cursor.execute(query)
    leave_application_rows = result.fetchall()

    if request.method == 'POST' and (request.form['submit_button']=="Approve" or request.form['submit_button']=="Deny"): # change variables accordingly
        """
        update leave_application_status of a leave_application
        :param conn: Connection object
        :param update_table_sql: an UPDATE TABLE statement
        :return: 
        """

        if request.form['submit_button'] == "Approve":
            leave_applcation_status = "APPROVED"
        elif request.form['submit_button'] == "Deny":
            leave_applcation_status = "DENIED"

        sql = ''' UPDATE leave_application
                    SET approver_name = ?,
                        leave_application_status = ?,
                        leave_approved_timestamp = ? 
                    WHERE application_id = ?'''
        
        # approve_or_decline = request.form['submit_button']
        # print(approve_or_decline)
        application_id = request.form['application_id'].split()[1]
        # print(application_id)
        
        approver_name = "approver name WIP"
        leave_approved_timestamp = datetime.datetime.now()
        
        tuple_of_approval_details = (approver_name, leave_applcation_status, leave_approved_timestamp, application_id)
        cur = connection.cursor()
        cur.execute(sql, (tuple_of_approval_details))
        connection.commit()


    cursor = connection.cursor()
    query = '''SELECT * 
            FROM leave_application 
            LEFT JOIN employee_details
                ON employee_details.employee_name = leave_application.applicant_name'''
    result = cursor.execute(query)
    leave_application_rows = result.fetchall()
    # print(leave_application_rows)

    return render_template('leave_approval_2.html', leave_application_rows=leave_application_rows)

