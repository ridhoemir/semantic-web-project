const d3 = require('d3-sparql');
const fetch = require('isomorphic-fetch');
const CONFIG = require('../config/config');

exports.getAll = (req, res) => {
  const url = 'http://localhost:3030/painting-artworks-with-img/sparql';
  const query = `
  prefix : <http://www.semanticweb.org/ridhoemirf/ontologies/painting-artworks#> 
  prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
  prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  SELECT ?subject ?nama ?tanggal_lahir ?tanggal_wafat ?daerah_asal ?nama_lukisan ?img_url 
  WHERE
    {
        ?subject a :Creator .
        ?subject :nama ?nama .
        ?subject :tanggal_lahir ?tanggal_lahir .
        ?subject :tanggal_wafat ?tanggal_wafat .
        ?subject :daerah_asal ?daerah_asal .
        ?subject :img_url ?img_url .
      
        ?subject :hasil_lukisan ?lukisan.
        ?lukisan :nama ?nama_lukisan.
      
    }
  `;
  // console.log(query);
  d3.sparql(url, query).then((data) => {
    res.render('index', { data });
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
  SELECT ?subject ?nama ?tanggal_lahir ?tanggal_wafat ?daerah_asal ?nama_lukisan ?img_url 
  WHERE
    {
        ?subject a :Creator .
        ?subject :nama ?nama .
        ?subject :tanggal_lahir ?tanggal_lahir .
        ?subject :tanggal_wafat ?tanggal_wafat .
        ?subject :daerah_asal ?daerah_asal .
        ?subject :img_url ?img_url .
      
        ?subject :hasil_lukisan ?lukisan.
        ?lukisan :nama ?nama_lukisan.

        filter(regex(?nama, "${params}", "i" )|| regex(?tanggal_lahir, "${params}", "i" ) || regex(?tanggal_wafat, "${params}", "i" ) || regex(?daerah_asal, "${params}", "i" ) || regex(?nama_lukisan, "${params}", "i" )) 
      
    }
  `;
  // console.log(query);
  d3.sparql(url, query).then((data) => {
    console.log(data);
    res.render('index', { data });
  }).catch((err) => {
    console.log(err);
  });
};