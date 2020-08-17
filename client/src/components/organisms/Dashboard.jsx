import React from 'react'

import Card from '../dashboard/Card'

// import Chart from 'chart.js'

const Dashboard = ({student, currentPostId, postList}) => {


    return(
        <div id="dashboard" className="dashboard hide-view">
            {student !== null && typeof student !== 'undefined' ? (
                <div>
                    <Card title="Número de comentários"         value={student.posts[currentPostId].numOfComments} icon="comment" />
                    <Card title="Número de referências"         value={student.posts[currentPostId].numOfReferences} icon="comment" />
                    <Card title="Número de respostas"           value={student.posts[currentPostId].numOfReceivedAnswers} icon="comment" />
                    <Card title="Número de respostas enviadas"  value={student.posts[currentPostId].numOfWrittenAnswers} icon="comment" />
                    <Card title="Número de conceitos"      value={student.posts[currentPostId].totalOfKeywordsUsed} icon="comment" />
                </div>
            ) : (
                <h2>Selecione um aluno para visualisar o desempenho</h2>
            )
            }
        </div>
    )

}

// class Dashboard extends Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             student: this.props.student
//         }
//     }

//     componentDidMount() {
//         console.log('AAAAAAAAAAAADWQ\n\n\n\n');
//         var ctx = document.getElementById('myChart').getContext('2d');
//         document.getElementById('Test').style.width = '40%'
//         document.getElementById('Test').style.height = '40%'
//         document.getElementById('Test').style.backgroundColor = 'white'
//         var chart = new Chart(ctx, {
//             // The type of chart we want to create
//             type: 'bar',
        
//             // The data for our dataset
//             data: {
//                 labels: ['T3A1', 'T4A1', 'T5A1', 'T6A0', 'T6A2', 'T7A1', 'T8A0'],
//                 datasets: [{
//                     label: 'Comentários por post',
//                     backgroundColor: 'rgb(130 , 180, 255)',
//                     borderColor: 'rgb(255, 99, 132)',
//                     data: [0, 2, 4, 1, 1, 0, 2]
//                 }]
//             },
        
//             // Configuration options go here
//             options: {}
//         });

//         if(this.props.student !== null)
//             console.log('\n\n\n\n\n\n'+this.props.student['8145996538366608424'])
//     }

//     render() {
//         return(
//             <div id="dashboard" className="dashboard hide-view">
//                 {this.state.student === null || this.state.student === undefined ? (
//                     <div>
//                         <Card title="Número de comentários" value="78" icon="comment" />
//                         <Card title="Número de referências" value="23" icon="comment" />
//                         <Card title="Número de respostas" value="11" icon="comment" />
//                         <Card title="Número de respostas enviadas" value="11" icon="comment" />
//                         <Card title="Número de palavras-chave" value="11" icon="comment" />
//                         <div className="rounded shadow" id="Test">
//                             <canvas id="myChart"></canvas>
//                         </div>
//                     </div>
//                     ) : (
//                     <h2>Selecione um aluno para visualisar o desempenho</h2>
//                 )
//                 }
//             </div>
//         )
//     }
// }

export default Dashboard