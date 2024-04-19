'use client'

import { useEffect, useState } from 'react'
import PromtCard from '@components/PromtCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="prompt_layout mt-16">
      {data.map((post, i) => (
        <PromtCard key={i} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState([])
  // Search
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState([])

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json()
    setPosts(data)
  }
  useEffect(() => {
    fetchPosts()
  }, [])

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, 'i')
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.prompt) ||
        regex.test(item.tag),
    )
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value)
        setSearchedResults(searchResult)
      }, 500),
    )
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)

    const searchResult = filterPrompts(tagName)
    setSearchedResults(searchResult)
  }

  return (
    <section className="feed">
      <form className="flex-center relative w-full">
        <input
          type="text"
          placeholder="Search for prompts..."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText === '' ? (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  )
}

export default Feed
