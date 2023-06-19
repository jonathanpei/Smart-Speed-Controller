from youtube_transcript_api import YouTubeTranscriptApi
import unicodedata
import textstat
import numpy as np


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

        if(end - start >= 5):
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
    complexity = (textstat.flesch_reading_ease(line['text'])-60)/30 #0 is average, positive is easy, negative is hard
    parameter = np.tanh(complexity-0.25)+2
    #parameter *= 1/(1.6*(np.tanh(talking_speed/3-4/3)+2)) + 0.65
    return parameter

def get_speeds_timestamped(transcript):
    combined_lines = segment(transcript)
    speeds = []

    for line in combined_lines:
        speed = calc_speed(line)
        speeds.append({'start': line['start'], 'end': line['end'], 'speed': speed})
    return speeds

def get_speeds_timestamped_averaged(transcript, window):
    script = get_speeds_timestamped(transcript)
    new_script = []
    for i in range(len(script)):
        speed_sum = 0
        count = 0
        for j in range(i-window, i+window+1):
            if(j >= 0 and j<len(script)):
                speed_sum += script[j]['speed']
                count += 1
        avg_speed = speed_sum/count
        new_script.append(script[i])
        new_script[i]['speed'] = avg_speed
    return new_script