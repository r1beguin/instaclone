import React from "react";


import {Box, Button, Text, TextInput} from "grommet";
import {Refresh} from "grommet-icons";

import Card from "../../components/Card";
import CardConcave from "../../components/CardConcave";

import {addPost, getPosts} from "../../services/postsServices";


const Posts = () => {

    const [posts, setposts] = React.useState();
    const [content, setcontent] =React.useState();
    const [refresh, setrefresh] = React.useState(true);

    const publish = (e) => {
        e.preventDefault();
        
        if (content){
            addPost(content)
        }
    }

    React.useEffect(() => {

        const fecthPosts = async () => {
            const fetchData = await getPosts();
            setposts(fetchData);
        }
        if (refresh) {
            fecthPosts();
            setrefresh(false);
        }
        
    }, [refresh])


    return(
        <Box align="center">
            <Box direction="row" gap="small">
                <TextInput placeholder="content" onChange={(e)=> setcontent(e.target.value)} />
                <Button label="publier" onClick={(e)=> publish(e)}/>
            </Box>
            <Button icon={<Refresh />} onClick={()=> setrefresh(true)}/>
            <Card 
            round="medium" 
            padding="medium" 
            justify="center"
            align="center"
            margin="medium"
            width="medium"
            height="medium">
                {posts ? 
                posts.map(post => (
                    <CardConcave align="center"
                    justify="center"
                    round="medium"
                    padding="medium"
                    margin="small"
                    width="small">
                        <Text>{post.content}</Text>
                    </CardConcave>
                ))

                 : 
                <Text>Ceci sont les posts</Text>
                }
            </Card>
        </Box>
    )
}

export default Posts;