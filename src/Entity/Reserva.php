<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Reserva
 *
 * @ORM\Table(name="reserva", indexes={@ORM\Index(name="id_est", columns={"id_est"}), @ORM\Index(name="id_cliente", columns={"id_cliente"})})
 * @ORM\Entity
 */
class Reserva
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_res", type="bigint", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idRes;

    /**
     * @var float
     *
     * @ORM\Column(name="precio_alquiler", type="float", precision=10, scale=0, nullable=false)
     */
    private $precioAlquiler;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="fecha_inicio", type="date", nullable=false, options={"default"="CURRENT_TIMESTAMP"})
     */
    private $fechaInicio = 'CURRENT_TIMESTAMP';

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="fecha_final", type="date", nullable=false)
     */
    private $fechaFinal;

    /**
     * @var string
     *
     * @ORM\Column(name="numero_cuenta", type="string", length=20, nullable=false)
     */
    private $numeroCuenta;

    /**
     * @var \Estancia
     *
     * @ORM\ManyToOne(targetEntity="Estancia")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_est", referencedColumnName="id_est")
     * })
     */
    private $idEst;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_cliente", referencedColumnName="id")
     * })
     */
    private $idCliente;

    public function getIdRes(): ?string
    {
        return $this->idRes;
    }

    public function getPrecioAlquiler(): ?float
    {
        return $this->precioAlquiler;
    }

    public function setPrecioAlquiler(float $precioAlquiler): self
    {
        $this->precioAlquiler = $precioAlquiler;

        return $this;
    }

    public function getFechaInicio(): ?\DateTimeInterface
    {
        return $this->fechaInicio;
    }

    public function setFechaInicio(\DateTimeInterface $fechaInicio): self
    {
        $this->fechaInicio = $fechaInicio;

        return $this;
    }

    public function getFechaFinal(): ?\DateTimeInterface
    {
        return $this->fechaFinal;
    }

    public function setFechaFinal(\DateTimeInterface $fechaFinal): self
    {
        $this->fechaFinal = $fechaFinal;

        return $this;
    }

    public function getNumeroCuenta(): ?string
    {
        return $this->numeroCuenta;
    }

    public function setNumeroCuenta(string $numeroCuenta): self
    {
        $this->numeroCuenta = $numeroCuenta;

        return $this;
    }

    public function getIdEst(): ?Estancia
    {
        return $this->idEst;
    }

    public function setIdEst(?Estancia $idEst): self
    {
        $this->idEst = $idEst;

        return $this;
    }

    public function getIdCliente(): ?User
    {
        return $this->idCliente;
    }

    public function setIdCliente(?User $idCliente): self
    {
        $this->idCliente = $idCliente;

        return $this;
    }


}
