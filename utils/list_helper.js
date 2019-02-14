const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  /*let likes = 0
  
  for (var key in blogs) {
    console.log(key)
  }
  for (var i=0; i<blogs.length; i++) {
    likes += blogs[i].likes
  }*/
  const likes = blogs.reduce((acc, cur) => acc + cur["likes"], 0)
  return likes
}

const bestBlog = (blogs) => {
  return blogs.reduce((acc, cur) => acc["likes"] > cur["likes"] ? acc : cur)
}
const mostBlogs = (blogs) => {
  let results = []
  for (var i=0; i<blogs.length; i++) {
    if (results[blogs[i]["author"]] === undefined) {
      results[blogs[i]["author"]] = 1
    } else {
      results[blogs[i]["author"]]++
    }

  }
  const winner = Object.keys(results).reduce((acc, cur) => results[acc]>results[cur] ? acc : cur)
  return {
    author: winner,
    blogs: results[winner]
  }
}

const mostLikes = (blogs) => {
  let results = []
  for (var i=0; i<blogs.length; i++) {
    if (results[blogs[i]["author"]] === undefined) {
      results[blogs[i]["author"]] = blogs[i]["likes"]
    } else {
      results[blogs[i]["author"]] += blogs[i]["likes"]
    }

  }
  const winner = Object.keys(results).reduce((acc, cur) => results[acc]>results[cur] ? acc : cur)
  return {
    author: winner,
    likes: results[winner]
  }
}

module.exports = { dummy, totalLikes, bestBlog, mostBlogs, mostLikes }