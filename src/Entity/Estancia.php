<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Estancia
 *
 * @ORM\Table(name="estancia", indexes={@ORM\Index(name="id_reg", columns={"id_reg"}), @ORM\Index(name="id_car", columns={"id_car"}), @ORM\Index(name="id_ciudad", columns={"id_ciudad"})})
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
     * @var bool
     *
     * @ORM\Column(name="disponible", type="boolean", nullable=false)
     */
    private $disponible;

    /**
     * @var string
     *
     * @ORM\Column(name="direccion", type="string", length=100, nullable=false)
     */
    private $direccion;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="fecha_ini_d", type="datetime", nullable=true, options={"default"="CURRENT_TIMESTAMP"})
     */
    private $fechaIniD = 'CURRENT_TIMESTAMP';

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="fecha_fin_d", type="datetime", nullable=true)
     */
    private $fechaFinD;

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
     * @var \CaracteristicasPiso
     *
     * @ORM\ManyToOne(targetEntity="CaracteristicasPiso")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_car", referencedColumnName="id_car")
     * })
     */
    private $idCar;

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

    public function getDisponible(): ?bool
    {
        return $this->disponible;
    }

    public function setDisponible(bool $disponible): self
    {
        $this->disponible = $disponible;

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

    public function getFechaIniD(): ?\DateTimeInterface
    {
        return $this->fechaIniD;
    }

    public function setFechaIniD(?\DateTimeInterface $fechaIniD): self
    {
        $this->fechaIniD = $fechaIniD;

        return $this;
    }

    public function getFechaFinD(): ?\DateTimeInterface
    {
        return $this->fechaFinD;
    }

    public function setFechaFinD(?\DateTimeInterface $fechaFinD): self
    {
        $this->fechaFinD = $fechaFinD;

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

    public function getIdCar(): ?CaracteristicasPiso
    {
        return $this->idCar;
    }

    public function setIdCar(?CaracteristicasPiso $idCar): self
    {
        $this->idCar = $idCar;

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
