var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

const defaultProperties = {
  'property 0': 'zero',
  'property 1': 'one',
  'property 2': 'two',
  'property 3': 'three',
  'property 4': 'four',
  'property 5': 'five',
  'property 6': 'six',
  'property 7': 'seven',
  'property 8': 'eight',
  'property 9': 'nine',
}

const objects = Array.from(new Array(1000)).map((r, i) => ({
    id: `id-${i}`,
    val: i
}));

// add tests
suite.add('Object spread', function() {
  const result1 = objects.reduce((acc, curr) => {
    acc[curr.id] = {
      ...defaultProperties,
      val: curr.val
    }
    return acc;
  }, {});  
});

suite.add('Object.assign', function() {
  const result2 = objects.reduce((acc, curr) => {
    acc[curr.id] = Object.assign({}, defaultProperties, {
      val: curr.val
    });
    return acc;
  }, {});
});


// add listeners
suite.on('cycle', function(event) {
  console.log(String(event.target));
})
suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})

// run async
suite.run({ 'async': true });
