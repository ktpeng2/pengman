import sys
import os

#reads all the txt's in the words folder and appends to a list if not already there
#sort list?
#create json file that will be read

#reading through all text files to create a large list of words to write json file
def getWords():
    words = []
    
    #getting all txt files for words
    for wordTxt in os.listdir('./words'):
        if wordTxt.endswith('.txt'):
            currFile = open('./words/'+wordTxt, 'r')
            content = currFile.readlines()

            #removing unneccessary characters and empty space
            for line in content:
                myWord = line.strip().replace('\n', '')
                #if not in list, add it to list
                if myWord.lower() not in words:
                    words.append(myWord.lower())
            currFile.close()

    return words


def createJson(words):

    f = open('words.json', 'w')

    f.write('{\n\t"words" : {\n')

    #writing the body of json file, reference json file
    for i in range(len(words)):
        if( i == len(words) - 1):
            f.write('\t\t"'+str(i)+'" : "' + words[i] + '"\n')
        else:
            f.write('\t\t"'+str(i)+'" : "' + words[i] + '",\n')

    f.write('\t}\n}')


    f.close()

wordsList = getWords()
wordsList.sort()
createJson(wordsList)

