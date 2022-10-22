async function editFormHandler(event){
    event.preventDefault();
    
    const title= document.querySelector('input[name="post-title"]').value;
    const content= document.querySelector('input[name="content"]').value;
    const id= window.location.toString().split('/')[window.location.toString().split('/').length -1];
    
 
        const response = await fetch(`/api/post/${id}`,{
            method:'put',
            body: JSON.stringify({ post_id: id, title, content }),
            headers: { 'Content-Type': 'application/json'}
        });
    
        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            alert(response.statusText);
        }
    }
    
    
 document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);