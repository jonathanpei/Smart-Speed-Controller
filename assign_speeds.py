from youtube_transcript_api import YouTubeTranscriptApi
import unicodedata
import pickle
import textstat
sample_script = 0

with open('transcript.txt', 'rb') as f:
    sample_script = pickle.load(f)

#segment into approx. 10 second clips
def segment(transcript):

    combined_lines = []

    clip_over = True
    start = 0

    big_line = ""

    for line in transcript:
        text = unicodedata.normalize("NFKD", line['text'])
        text = text.split('\n')
        text = " ".join(text)

        if(clip_over):
            start = line['start']

            big_line = ""
            clip_over = False
        big_line += " "+text
        end = line['start'] + line['duration']

        if(end - start >= 10):
            clip_over = True
            combined_lines.append({'text': big_line, 'start': start, 'end': end, 'duration': end-start})
        
    return combined_lines



def syllable_per_time(line):
    text = line['text']
    duration = line['duration']
    syllables = textstat.syllable_count(text)
    return syllables/duration

def calc_speed(line):
    talking_speed = syllable_per_time(line) #4 is average
    complexity = (textstat.flesch_reading_ease(line['text'])-60)/6 #0 is average, positive is easy, negative is hard
    parameter = 5/talking_speed - 1/4

    parameter *= (2*2**complexity)/(2**complexity+1)+1
    
    return parameter

def get_speeds_timestamped(transcript):
    combined_lines = segment(transcript)
    speeds = []

    for line in combined_lines:
        speed = calc_speed(line)
        speeds.append({'start': line['start'], 'end': line['end'], 'speed': speed})
    return speeds
