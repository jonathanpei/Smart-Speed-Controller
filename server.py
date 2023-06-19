from flask import Flask, jsonify, request
from youtube_transcript_api import YouTubeTranscriptApi

import assign_speeds

app = Flask(__name__)

@app.route('/', methods=['GET'])
def get_json():
    print(request.args.get("video_id"))
    response = jsonify(assign_speeds.get_speeds_timestamped_averaged(YouTubeTranscriptApi.get_transcript(request.args.get("video_id")),1))
    #response = jsonify(assign_speeds.get_speeds_timestamped(sample_script))

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run()