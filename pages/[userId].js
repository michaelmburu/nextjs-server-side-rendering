const UserIdPage = (props) => {
    return (
        <h1>{props.id}</h1>
    )
}

export const getServerSideProps = async (context) => {

    const {params} = context

    const userId = params.userId
    return {
        props:{
            id: 'userid-' + userId
        }
    }
}

export default UserIdPage