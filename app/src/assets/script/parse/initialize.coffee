Parse.initialize "JeZTJRXz7olrR7jLVEsHppyRolMGjJdeoTNVVg8m", "Xyg6oi5UevbRk1Rp3RuSdq9omwPJekz0NyxzAV7v"

###
TestObject = Parse.Object.extend "TestObject"
testObject = new TestObject()
testObject
  .save
    foo: "bar"
  .then (object) ->
    alert "yay! it worked"
###
