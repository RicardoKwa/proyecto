<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Estancia
 *
 * @ORM\Table(name="estancia", indexes={@ORM\Index(name="id_car", columns={"id_car"}), @ORM\Index(name="id_ciudad", columns={"id_ciudad"}), @ORM\Index(name="id_reg", columns={"id_reg"}), @ORM\Index(name="id_img", columns={"id_img"})})
 * @ORM\Entity
 */
class Estancia
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_est", type="bigint", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idEst;

    /**
     * @var string
     *
     * @ORM\Column(name="tipo_est", type="string", length=0, nullable=false)
     */
    private $tipoEst;

    /**
     * @var float
     *
     * @ORM\Column(name="precio_mes", type="float", precision=10, scale=0, nullable=false)
     */
    private $precioMes;

    /**
     * @var float
     *
     * @ORM\Column(name="fianza", type="float", precision=10, scale=0, nullable=false)
     */
    private $fianza;

    /**
     * @var string
     *
     * @ORM\Column(name="direccion", type="string", length=100, nullable=false)
     */
    private $direccion;

    /**
     * @var float|null
     *
     * @ORM\Column(name="latitud", type="float", precision=10, scale=0, nullable=true)
     */
    private $latitud;

    /**
     * @var float|null
     *
     * @ORM\Column(name="longitud", type="float", precision=10, scale=0, nullable=true)
     */
    private $longitud;

    /**
     * @var \CaracteristicasPiso
     *
     * @ORM\ManyToOne(targetEntity="CaracteristicasPiso")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_car", referencedColumnName="id_car")
     * })
     */
    private $idCar;

    /**
     * @var \Imagenes
     *
     * @ORM\ManyToOne(targetEntity="Imagenes")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_img", referencedColumnName="id")
     * })
     */
    private $idImg;

    /**
     * @var \Ciudad
     *
     * @ORM\ManyToOne(targetEntity="Ciudad")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_ciudad", referencedColumnName="id_ciudad")
     * })
     */
    private $idCiudad;

    /**
     * @var \ConjuntoReglas
     *
     * @ORM\ManyToOne(targetEntity="ConjuntoReglas")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_reg", referencedColumnName="id_reg")
     * })
     */
    private $idReg;

    public function getIdEst(): ?string
    {
        return $this->idEst;
    }

    public function getTipoEst(): ?string
    {
        return $this->tipoEst;
    }

    public function setTipoEst(string $tipoEst): self
    {
        $this->tipoEst = $tipoEst;

        return $this;
    }

    public function getPrecioMes(): ?float
    {
        return $this->precioMes;
    }

    public function setPrecioMes(float $precioMes): self
    {
        $this->precioMes = $precioMes;

        return $this;
    }

    public function getFianza(): ?float
    {
        return $this->fianza;
    }

    public function setFianza(float $fianza): self
    {
        $this->fianza = $fianza;

        return $this;
    }

    public function getDireccion(): ?string
    {
        return $this->direccion;
    }

    public function setDireccion(string $direccion): self
    {
        $this->direccion = $direccion;

        return $this;
    }

    public function getLatitud(): ?float
    {
        return $this->latitud;
    }

    public function setLatitud(?float $latitud): self
    {
        $this->latitud = $latitud;

        return $this;
    }

    public function getLongitud(): ?float
    {
        return $this->longitud;
    }

    public function setLongitud(?float $longitud): self
    {
        $this->longitud = $longitud;

        return $this;
    }

    public function getIdCar(): ?CaracteristicasPiso
    {
        return $this->idCar;
    }

    public function setIdCar(?CaracteristicasPiso $idCar): self
    {
        $this->idCar = $idCar;

        return $this;
    }

    public function getIdImg(): ?Imagenes
    {
        return $this->idImg;
    }

    public function setIdImg(?Imagenes $idImg): self
    {
        $this->idImg = $idImg;

        return $this;
    }

    public function getIdCiudad(): ?Ciudad
    {
        return $this->idCiudad;
    }

    public function setIdCiudad(?Ciudad $idCiudad): self
    {
        $this->idCiudad = $idCiudad;

        return $this;
    }

    public function getIdReg(): ?ConjuntoReglas
    {
        return $this->idReg;
    }

    public function setIdReg(?ConjuntoReglas $idReg): self
    {
        $this->idReg = $idReg;

        return $this;
    }


}
