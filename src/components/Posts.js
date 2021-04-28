import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Link} from 'react-router-dom';

import {deleteComment, fetchPosts, selectPosts} from '../slices/posts';
import Spinner from './Spinner';
import placeholder from '../images/placeholder.jpg';
import {deletePost} from './../slices/posts';
import Comment from './Comment';
import {selectIsLoggedIn, selectUser} from './../slices/auth';

dayjs.extend(relativeTime);

const Posts = () => {
  const dispatch = useDispatch();
  const [showComment, setShowComment] = React.useState(null);
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  const {isLoading, data: postsData, isLoadingSubmit} = useSelector(
    selectPosts
  );
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoading) return <Spinner />;
  return (
    <div>
      <div class="container">
        {postsData.length
          ? postsData.map((post, index) => (
              <div
                class="well"
                key={post.id}
                style={{padding: 5, marginBottom: 0}}
              >
                <div class="media">
                  <a class="pull-left" href="#">
                    <img
                      class="media-object"
                      src={post.img || placeholder}
                      width="150px"
                    />
                  </a>
                  <div class="media-body">
                    
                    <Link to={'/single-post/' + post.id}><h4 class="media-heading">{post.title}</h4></Link>
                    <h4>
                      {post?.user?.name || post?.user?.email?.split('@')[0]}
                    </h4>
                    {/*<p class="text-right">
                      By {post?.user?.name || post?.user?.email?.split('@')[0]}
                    </p>*/}
                    <p dangerouslySetInnerHTML={{__html: post.description}}></p>
                    <ul class="list-inline list-unstyled">
                      <li>
                        <span>
                          <i class="glyphicon glyphicon-calendar"></i>{' '}
                          {dayjs(post.createdAt)?.fromNow()}{' '}
                        </span>
                      </li>
                      <li>|</li>

                      <span
                        style={{cursor: 'pointer'}}
                        onClick={() =>
                          typeof showComment === 'number'
                            ? setShowComment(null)
                            : setShowComment(index)
                        }
                      >
                        <i class="glyphicon glyphicon-comment"></i>{' '}
                        {post.comments?.length || 0} comments
                      </span>

                      {user.id === post?.user?.id && (
                        <>
                          <li>|</li>
                          <span
                            onClick={() => dispatch(deletePost(post.id))}
                            disabled={isLoadingSubmit}
                            style={{cursor: 'pointer'}}
                          >
                            <a>
                              <i class="glyphicon glyphicon-trash"></i>{' '}
                              {isLoadingSubmit ? 'Loading...' : 'Delete'}
                            </a>
                          </span>
                        </>
                      )}
                      {user.id === post?.user?.id && (
                        <>
                          <li>|</li>
                          <span style={{cursor: 'pointer'}}>
                            <Link to={'/edit-post/' + post.id}>
                              <i class="glyphicon glyphicon-pencil"></i> Edit
                            </Link>
                          </span>
                        </>
                      )}
                    </ul>

                    {showComment === index ? (
                      <div style={{margin: 10, marginTop: 17}}>
                        <h4>Comments</h4>
                        {post.comments?.map(comment => {
                          return (
                            <div style={{margin: 7}}>
                              <b class="text-left">
                                {' '}
                                {comment?.user?.name ||
                                  comment?.user?.email?.split('@')[0]}
                              </b>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: comment.content,
                                }}
                              ></p>
                              <ul class="list-inline list-unstyled">
                                <li>
                                  <span>
                                    <i class="glyphicon glyphicon-calendar"></i>{' '}
                                    {dayjs(comment.createdAt)?.fromNow()}{' '}
                                  </span>
                                </li>

                                {user.id === comment?.user?.id && (
                                  <>
                                    <li>|</li>
                                    <span
                                      onClick={() => {
                                        if (window.confirm('are you sure?'))
                                          dispatch(
                                            deleteComment(post.id, comment._id)
                                          );
                                      }}
                                      disabled={isLoadingSubmit}
                                      style={{cursor: 'pointer'}}
                                    >
                                      <a>
                                        <i class="glyphicon glyphicon-trash"></i>{' '}
                                        {isLoadingSubmit
                                          ? 'Loading...'
                                          : 'Delete'}
                                      </a>
                                    </span>
                                  </>
                                )}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      ''
                    )}
                    {showComment === index && isLoggedIn && (
                      <Comment
                        post={post}
                        handleCancel={() => setShowComment(null)}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))
          : 'No Post Available'}
      </div>
    </div>
  );
};

export default Posts;
