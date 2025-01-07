import React, { useEffect, useState } from 'react';

const Blog = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch('')
        .then((res) => res.json())
        .then((data)=> {
            setItems(data);
        })
        .catch((error)=> console.log("Error fetching data:", error));
    }, []);

    return (
        <div>
            <ul>
                {items.map((item, index)=> (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}


export default Blog;