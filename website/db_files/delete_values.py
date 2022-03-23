import sqlite3

conn = sqlite3.connect('.\website\pythonsqlite.db')
c = conn.cursor()

# delete all rows from table
c.execute('DELETE FROM employee_details;',);
print('We have deleted', c.rowcount, 'records from the employee_detaills table.')


c.execute('DELETE FROM leave_application;',);
print('We have deleted', c.rowcount, 'records from the leave_application table.')

c.execute('DELETE FROM admin;',);
print('We have deleted', c.rowcount, 'records from the admin table.')

#commit the changes to db			
conn.commit()
#close the connection
conn.close()
