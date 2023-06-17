from flask import Flask, jsonify, request
import pickle
import assign_speeds
app = Flask(__name__)


sample_script = 0

with open('transcript.txt', 'rb') as f:
    sample_script = pickle.load(f)

@app.route('/', methods=['GET'])
def get_json():
    print(request.args.get("video_id"))
    return jsonify(assign_speeds.get_speeds_timestamped(sample_script))

if __name__ == '__main__':
    app.run()