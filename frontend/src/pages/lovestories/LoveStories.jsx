import { Heart} from 'lucide-react';
import './lovestories.css';
import {lovestoryConfig} from "../../contractABI/lovestoryConfig.js"
import { stakeConfig } from '../../contractABI/stakeConfig.js';
import { useReadContract, useWriteContract } from 'wagmi';
import crypto from "crypto";
import { useRef } from 'react';
const LoveStories = () => {
  const stories = [
    {
      id: 1,
      author: "Alice & Bob",
      content: "We met at a blockchain conference and have been inseparable ever since. Staking our love on PoL was the best decision we ever made!",
      likes: 156,
      comments: 23,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      author: "Carol & Dave",
      content: "Three years of staking and our love grows stronger each day. The NFTs we've collected are precious memories of our journey together.",
      likes: 89,
      comments: 12,
      timestamp: "5 hours ago"
    }
  ];

  const postRef = useRef("");
  const {data:hash,writeContract} = useWriteContract();
  const {data:hash2,writeContract:likewriteContract} = useWriteContract();
  const {data:post,isPending,error} = useReadContract({
    ...lovestoryConfig,
    functionName : 'getAllPost'
  });
  if(!isPending)
    console.log(post);
  if(error)
    console.log("Error while fetching the posts");

  const hashString = (message) => {
    return crypto.createHash(message).update(message).digest('hex');
  }

  const handleShareStory = () => {
    try{
      const post = postRef.current.value;
      const msg = hashString(post);
      writeContract({
        ...stakeConfig,
        functionName : 'createLovePost',
        args : [msg]
      })
      console.log(hash);
    } catch(err) {
      console.log("Error in creating post...");
      console.log(err);
    }
  }

  const handleLikePost = (_id) => {
    likewriteContract({
      ...lovestoryConfig,
      functionName : 'likePost',
      args : [_id]
    })
    console.log(hash2);
  }

  return (
    <div className="container">
      <h1 className="title text-gradient fontfamily">Love Stories</h1>

      <div className="lovestory-card share-story">
        <h2 className="subtitle fontfamily">Share Your Story</h2>
        <textarea
          placeholder="Write your love story..."
          className="story-input fontfamily"
          ref={postRef}
        />
        <div className="button-container">
          <button className="share-button fontfamily" onClick={handleShareStory}>Share Story</button>
        </div>
      </div>

      <div className="stories-list">
        {stories.map(story => (
          <div key={story.id} className="lovestory-card story-card">
            <div className="story-header">
              <div className="avatar fontfamily">{story.author.charAt(0)}</div>
              <div>
                <h3 className="author fontfamily">{story.author}</h3>
                <p className="timestamp fontfamily">{story.timestamp}</p>
              </div>
            </div>
            
            <p className="story-content fontfamily">{story.content}</p>
            
            <div className="story-actions">
              <button className="action-button" onClick={handleLikePost}>
                <Heart className="icon" />
                <span>{story.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoveStories;
