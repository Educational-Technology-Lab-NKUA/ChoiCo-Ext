function rand(a, b) {
  return math.random(a,b);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
rand.transform = function (a, b) {
//  console.log('input: a=' + a + ', b=' + b)
  // we can manipulate input here before executing addIt

  const res = getRandomIntInclusive (a,b)

//  console.log('result: ' + res)
  // we can manipulate result here before returning

  return (res)
}
// import the function into math.js
math.import({
  rand: rand
})
