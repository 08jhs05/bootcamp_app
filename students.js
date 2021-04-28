const { Pool } = require('pg');

const cohort = process.argv[2];
const maxResult = Number( process.argv[3] );

const queryString = `SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2;`

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(queryString, [`%${cohort}%`, maxResult])
.then(res => {
  for(const row of res.rows) {
    console.log(`${row.name} has an id of ${row.student_id} and was in the ${row.cohort} cohort`);
  }
})
.catch(err => console.error('query error', err.stack));