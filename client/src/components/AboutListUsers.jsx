import React from 'react'

function AboutListUsers() {
  return (
    <>
    <div className="card-actions justify-end">
        <div className="h-48 overflow-x-auto" >
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody className='overflow-y-auto'>
                {/* row 1 */}
                <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                </tr>
                {/* row 2 */}
                <tr className="hover">
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                </tr>
                {/* row 3 */}
                <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                </tr>
                        {/* row 3 */}
                        <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                </tr>
                </tbody>
            </table>
        </div>
        </div> 
    </>
  )
}

export default AboutListUsers
