import { React } from 'react';
import { useParams } from 'react-router-dom';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

import NotFound from './NotFound';

const Post = ({ posts }) => {
    
    const { postSlug } = useParams();
    const post = posts.find(
        (post) => post.slug === postSlug
    );

    post && console.log(post);

    const converter = new QuillDeltaToHtmlConverter(
        post.content.ops,
        {}
    );
    const htmlContent = converter.convert();

    if (!post) {
        return (
          <NotFound />  
        );
    }
    
    // Enable rendering if post content was not HTML convertible....
    return(
        <article className = 'post container'>
            <h1>{post.title}</h1>
            {htmlContent 
            ? <div
            dangerouslySetInnerHTML={( () => ({
            __html:  htmlContent
            }))()}
            />
            : post.content
            }
            
        </article>
    );
};

export default Post;