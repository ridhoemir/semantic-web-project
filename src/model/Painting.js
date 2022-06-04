const d3 = require('d3-sparql');
const fetch = require('isomorphic-fetch');
const CONFIG = require('../config/config');

exports.getAll = (req, res) => {
  const url = 'http://localhost:3030/painting-artworks-with-img/sparql';
  const query = `
  prefix : <http://www.semanticweb.org/ridhoemirf/ontologies/painting-artworks#> 
  prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
  prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  SELECT ?subject ?nama ?tahun_pembuatan ?nama_pencipta ?img_url ?makna
  WHERE
    {
        ?subject a :Painting .
        ?subject :nama ?nama .
        ?subject :tahun_pembuatan ?tahun_pembuatan .
        ?subject :img_url ?img_url .
        OPTIONAL { ?subject :makna ?makna }.

        ?subject :nama_pencipta ?creator .
        ?creator :nama ?nama_pencipta .
      
      
    }
  ORDER BY ?tahun_pembuatan
  `;
  d3.sparql(url, query).then((data) => {
    console.log(data);
    res.render('painting', { data });
  }).catch((err) => {
    console.log(err);
  });
};

exports.search = (req, res) => {
  const params = req.query.search;
  const url = 'http://localhost:3030/painting-artworks-with-img/query';
  const query = `
  prefix : <http://www.semanticweb.org/ridhoemirf/ontologies/painting-artworks#> 
  prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
  prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  SELECT ?subject ?nama ?tahun_pembuatan ?nama_pencipta ?img_url ?makna
  WHERE
    {
        ?subject a :Painting .
        ?subject :nama ?nama .
        ?subject :tahun_pembuatan ?tahun_pembuatan .
        ?subject :img_url ?img_url .
        OPTIONAL { ?subject :makna ?makna }.

        ?subject :nama_pencipta ?creator .
        ?creator :nama ?nama_pencipta .

        filter(regex(?nama, "${params}", "i" )|| regex(?tahun_pembuatan, "${params}", "i" ) || regex(?nama_pencipta, "${params}", "i" )) 
      
    }
  `;
  d3.sparql(url, query).then((data) => {
    console.log(data);
    res.render('painting', { data });
  }).catch((err) => {
    console.log(err);
  });
};

exports.getDetail = (req, res) => {
  const params = req.params.id;
  const url = 'http://localhost:3030/painting-artworks-with-img/query';
  const query = `
  prefix : <http://www.semanticweb.org/ridhoemirf/ontologies/painting-artworks#> 
  prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
  prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  SELECT  ?nama ?tahun_pembuatan ?nama_pencipta ?img_url ?makna
  WHERE
    {
        :${params} a :Painting .
        :${params} :nama ?nama .
        :${params} :tahun_pembuatan ?tahun_pembuatan .
        :${params} :img_url ?img_url .
        OPTIONAL { :${params} :makna ?makna }.

        :${params} :nama_pencipta ?creator .
        ?creator :nama ?nama_pencipta .
      
    }
  `;
  
  d3.sparql(url, query).then((data) => {
    console.log(data);
    res.send( data );
  }).catch((err) => {
    console.log(err);
  });
}
