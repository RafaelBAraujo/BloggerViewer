import React from 'react'

const ClassSummary = ({students}) => {

    return(
        <div className="summary rounded shadow">

            <table>
                <tbody>
                <tr>
                    <th>Nome</th>
                    <th>Nº Comentários</th>
                    <th>Nº Interações</th>
                    <th>Nº Respostas</th>
                </tr>
                    {students.map((student) => {
                        return(
                            <tr>
                                <td>{student.displayName}</td>
                                <td>{student.numComments}</td>
                                <td>{student.numReplies}</td>
                                <td>{student.numOfRepliesReceived}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td>Rafael Barbaroto</td>
                        <td>32</td>
                        <td>12</td>
                        <td>4</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )

}

export default ClassSummary