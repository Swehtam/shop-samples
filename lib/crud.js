const mysql = require('mysql');
const config = require('../config/default');

var sentencesMagitude, sentencesAdjective;

const pool = mysql.createPool({
	user 		: config.database.USERNAME,
	password 	: config.database.PASSWORD,
	database 	: config.database.DATABASE,
	host 		: config.database.HOST,
	port        : config.database.PORT || 3306
});

function query(sql, values){
  return new Promise((resolve, reject) => {
  	pool.query(sql, (err, results) => {
  		if (err) { reject(err); } 
  		else { resolve(results); }
  	});
  });
};

function getAleatoryNumber(min, max){
	return Math.floor((Math.random()*max) + min)
};

async function loadTables(callback){
	let selectJoin = 	
				`SELECT sentences.Sentence, sentences.Id 
				FROM sentences INNER JOIN news 
				ON sentences.NewId = news.Id WHERE news.OverallMagnitude >= 20`;

	await query(selectJoin).then((value) => {
		sentencesMagitude = value;
	}, (reason) => {
		console.log(reason);
	});

	let selectAdjective = `SELECT Sentence, Id from sentences WHERE numberAdj BETWEEN 5 AND 10`;

	await query(selectAdjective).then((value) => {
		sentencesAdjective = value;
	}, (reason) => {
		console.log(reason);
	});

	callback();
}

function getSentenceByMagnitude(quant){
	let aleatoryRow = []
	for(let i = 0; i < quant; i++){
		aleatoryId = getAleatoryNumber(0, sentencesMagitude.length);
		aleatoryRow.push(sentencesMagitude[aleatoryId]);
	}
	return aleatoryRow;
}

function getSentenceByAdjective(quant){
	let aleatoryRow = []
	for(let i = 0; i < quant; i++){
		aleatoryId = getAleatoryNumber(0, sentencesAdjective.length);
		aleatoryRow.push(sentencesAdjective[aleatoryId]);
	}
	return aleatoryRow;
}

async function getSentenceAleatory(quant) {
	let aleatoryRow = [];

	for(let i = 0; i < quant; i++){
		let id = getAleatoryNumber(0, 579776);
		let selectQuery = `SELECT Sentence, Id FROM sentences WHERE id = ${id}`;
		await query(selectQuery).then((value) => {
			aleatoryRow.push(value[0]);
		}, (reason) => {
			console.log(reason);
		});
	}

	return aleatoryRow;
}

async function getVoteCount(){
	let groupBy = 'SELECT sentiment, COUNT(*) AS count FROM sentiment GROUP BY sentiment'
	let count = {
		total: 0,
		negative: 0,
		neutral: 0,
		positive: 0
	}

	await query(groupBy).then((value) => {
		for(let i=0; i < value.length; i++){
			switch(value[i].sentiment){
				case 1:
					count.positive = value[i].count;
					break;
				case 0:
					count.neutral = value[i].count;
					break;
				case -1:
					count.negative = value[i].count;
					break;
			}
		}
		count.total = count.positive + count.negative + count.neutral;
	}, (reason) => {
		console.log(reason);
	});

	return count;
}

function insertVote(id, note) {
	const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
	let insertQuery = `INSERT INTO sentiment VALUES (null, ${id}, ${note}, '${date}' )`;
	query(insertQuery);
}

module.exports = {
	loadTables,
	getSentenceByMagnitude,
	getSentenceByAdjective,
	getSentenceAleatory,
	getVoteCount,
	insertVote
}