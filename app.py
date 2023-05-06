# import necessary libraries
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

# initialize flask app and connect to database
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
db = SQLAlchemy(app)

# create a Task model to store tasks in the database
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    assignee = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'Task {self.id} - {self.title}'

# create home page for the app
@app.route('/')
def home():
    tasks = Task.query.all()
    return render_template('home.html', tasks=tasks)

# create a page to add tasks
@app.route('/add', methods=['GET', 'POST'])
def add():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        assignee = request.form['assignee']
        task = Task(title=title, description=description, assignee=assignee)
        db.session.add(task)
        db.session.commit()
        return redirect(url_for('home'))
    else:
        return render_template('add.html')

# create a page to edit tasks
@app.route('/edit/<int:id>', methods=['GET', 'POST'])
def edit(id):
    task = Task.query.get(id)
    if request.method == 'POST':
        task.title = request.form['title']
        task.description = request.form['description']
        task.assignee = request.form['assignee']
        db.session.commit()
        return redirect(url_for('home'))
    else:
        return render_template('edit.html', task=task)

# create a page to delete tasks
@app.route('/delete/<int:id>', methods=['POST'])
def delete(id):
    task = Task.query.get(id)
    db.session.delete(task)
    db.session.commit()
    return redirect(url_for('home'))

if __name__ == '__main__':
    # create the database if it doesn't already exist
    with app.app_context():
        db.create_all()
    # run the app
    app.run(host="0.0.0.0")
