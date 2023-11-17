from flask import Flask, request, render_template_string

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        q1_answer = request.form.get('q1')
        
        if q1_answer == 'YES':
            return render_template_string(Q2_TEMPLATE)
        elif q1_answer == 'NO':
            return render_template_string(Q3_TEMPLATE)
    
    return render_template_string(Q1_TEMPLATE)

Q1_TEMPLATE = '''
<!DOCTYPE html>
<html>
<head>
  <title>Throwing Proficiency</title>
</head>
<body>
  <h1>Throwing Proficiency Assessment</h1>
  <form method="post">
    <p>{{ question }}</p>
    <input type="radio" name="q1" value="YES" required> YES
    <input type="radio" name="q1" value="NO" required> NO
    <br><br>
    <input type="submit" value="Submit">
  </form>
</body>
</html>
'''

Q2_TEMPLATE = '''
<!DOCTYPE html>
<html>
<head>
  <title>Throwing Proficiency</title>
</head>
<body>
  <h1>Throwing Proficiency Assessment</h1>
  <p>{{ question }}</p>
  <p>Is there a long contralateral step forward?</p>
  <a href="/">Back to first question</a>
</body>
</html>
'''

Q3_TEMPLATE = '''
<!DOCTYPE html>
<html>
<head>
  <title>Throwing Proficiency</title>
</head>
<body>
  <h1>Throwing Proficiency Assessment</h1>
  <p>{{ question }}</p>
  <p>Is there a step forward with either foot?</p>
  <a href="/">Back to first question</a>
</body>
</html>
'''

if __name__ == '__main__':
    app.run(debug=True)

