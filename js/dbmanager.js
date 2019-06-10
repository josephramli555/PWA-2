	var dbPromise = idb.open("footballdb", 1, function(upgradeDb) {
  		if (!upgradeDb.objectStoreNames.contains("playerTable")) {
   			var objectStore=upgradeDb.createObjectStore("playerTable",{keyPath:"id"});
 		     objectStore.createIndex("img", "img", {
         unique: false
      });
    }
	});



	function insertPlayer(player){
		dbPromise.then(function(db) {
            var tx = db.transaction('playerTable', 'readwrite');
            var store = tx.objectStore('playerTable');
            store.add(player); //menambahkan key "buku"
            return tx.complete;
        }).then(function() {
            alert("Data Inserted");
        }).catch(function() {
            alert("Data Fail to Inserted");
        })
	}

function getAllSavedPlayerDb() {
  return new Promise(function(resolve, reject) {
    dbPromise
      .then(function(db) {
        var tx = db.transaction("playerTable", "readonly");
        var store = tx.objectStore("playerTable");
        return store.getAll();
      })
      .then(function(player) {
        resolve(player);
      });
  });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromise
      .then(function(db) {
        var tx = db.transaction("playerTable", "readonly");
        var store = tx.objectStore("playerTable");
        return store.get(id);
      })
      .then(function(player) {
        resolve(player);
      });
  });
}

function deleteItem(id){
dbPromise.then(function(db) {
  var tx = db.transaction('playerTable', 'readwrite');
  var store = tx.objectStore('playerTable');
  store.delete(id);
  return tx.complete;
}).then(function() {
  console.log('Item Berhasil Dihapus'+id);
});
}
