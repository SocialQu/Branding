import json
import csv


# Function to convert a CSV to JSON
# Takes the file paths as arguments
def make_json(filePath, column='Score'):
	data = []
	
	# Open a csv reader called DictReader
	with open(filePath + '.csv', encoding='utf-8') as csvf:
		csvReader = csv.DictReader(csvf)
		
		# Convert each row into a dictionary
		# and add it to data
		for rows in csvReader:
			data.append(rows)

	# Open a json writer, and use the json.dumps()
	# function to dump data
	arr = []
	for d in data: arr.append(float(d[column]))

	with open(filePath + '.json', 'w', encoding='utf-8') as jsonf:
		jsonf.write(json.dumps(arr, indent=4, ensure_ascii=False))
		
# Driver Code

# Decide the two file paths according to your
# computer system
predictions = r'data/predictions'
tabnet = r'data/predictions_tabnet'
tweets = r'data/tweets'

# Call the make_json function
make_json(predictions)
make_json(tabnet)
make_json(tweets, column='ENGAGEMENTS')
