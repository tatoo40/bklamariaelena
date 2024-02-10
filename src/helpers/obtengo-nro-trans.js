
async function obtengoNroTrans() {
  const numerador = await this.prisma.numerador.findFirst({
    where: {
      descripcion:'nro_trans',
      estado:'S'
    },
  });


  const updateNumerador = await this.prisma.numerador.update({
    where: {
      id: numerador.id,
    },
    data: {
      valor:numerador.valor + 1,
    },
  });


 

  return numerador.valor + 1;


}

module.exports = { obtengoNroTrans }
