const { response }  = require('express');
const Cliente = require('../models/clientes');



const getClientes = async (req, res = response) =>{
    try{
        const listClientes = await Cliente.findAll()
        res.json({listClientes});
    }catch(err){
        console.log(err);
        res.json({
            msg:`Error al obtener la lista`
        })
    }
    
}

const getCliente = async (req, res = response) =>{
    try{
        const {id} = req.params
        const cliente = await Cliente.findByPk(id)
        
        if(cliente){
            res.json(cliente)
        }else{
            res.status(404).json(`No se encontro el cliente con id ${id}`);
        }
    }catch(err){
        console.log(err);
        res.json({
        msg:`Error`
        })
    }
    
} 

const putCliente = async (req, res = response) => {
    const { id } = req.params;
    const body = req

    const cliente = await Cliente.findByPk(id)

    if(cliente){
        await cliente.update(body)
        res.json({
            msg:`El cliente fue actualizado exitosamente.`
        })
    }else{
        res.status(403).send(`No se encontro el cliente con ID ${id}`)
    }
}

const postCliente = async (req, res = response) => {
    try{
        const {body} = req

        await Cliente.create(body)

        if(body){
            res.json({msg: `Se ha creado un nuevo cliente`})
            res.json(body)
        }else{
            res.json(`Estan mal ingresados los datos`)
        }
        
    }catch(err){
        console.log(err.message)
        res.json({msg:`Upps ocurrio un error`})
    }
    
}

const deleteCliente = async (req, res = response) => {
    const {id} = req.params
    const cliente = await Cliente.findByPk(id)

    if(cliente){
        await Cliente.destroy()
        res.json(`El cliente fue eliminado exitosamente.`)
    }else{
        res.json(`Error.`)
    }
}

module.exports = {
    getCliente,
    getClientes,
    postCliente,
    putCliente,
    deleteCliente
}