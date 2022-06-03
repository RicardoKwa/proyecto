<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * CaracteristicasPiso
 *
 * @ORM\Table(name="caracteristicas_piso")
 * @ORM\Entity
 */
class CaracteristicasPiso
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_car", type="bigint", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idCar;

    /**
     * @var int
     *
     * @ORM\Column(name="num_banos", type="integer", nullable=false)
     */
    private $numBanos;

    /**
     * @var int
     *
     * @ORM\Column(name="num_hab", type="integer", nullable=false)
     */
    private $numHab;

    /**
     * @var bool
     *
     * @ORM\Column(name="television", type="boolean", nullable=false)
     */
    private $television;

    /**
     * @var bool
     *
     * @ORM\Column(name="amueblado", type="boolean", nullable=false)
     */
    private $amueblado;

    /**
     * @var bool
     *
     * @ORM\Column(name="llave_dormitorio", type="boolean", nullable=false)
     */
    private $llaveDormitorio;

    /**
     * @var bool
     *
     * @ORM\Column(name="calefaccion", type="boolean", nullable=false)
     */
    private $calefaccion;

    /**
     * @var bool
     *
     * @ORM\Column(name="ascensor", type="boolean", nullable=false)
     */
    private $ascensor;

    /**
     * @var bool
     *
     * @ORM\Column(name="aire_acond", type="boolean", nullable=false)
     */
    private $aireAcond;

    /**
     * @var bool
     *
     * @ORM\Column(name="exterior", type="boolean", nullable=false)
     */
    private $exterior;

    /**
     * @var bool
     *
     * @ORM\Column(name="garaje", type="boolean", nullable=false)
     */
    private $garaje;

    /**
     * @var bool
     *
     * @ORM\Column(name="lavadora", type="boolean", nullable=false)
     */
    private $lavadora;

    /**
     * @var bool
     *
     * @ORM\Column(name="internet", type="boolean", nullable=false)
     */
    private $internet;

    /**
     * @var bool
     *
     * @ORM\Column(name="playa", type="boolean", nullable=false)
     */
    private $playa;

    /**
     * @var bool
     *
     * @ORM\Column(name="cocina_equipada", type="boolean", nullable=false)
     */
    private $cocinaEquipada;

    /**
     * @var bool
     *
     * @ORM\Column(name="luminoso", type="boolean", nullable=false)
     */
    private $luminoso;

    public function getIdCar(): ?string
    {
        return $this->idCar;
    }

    public function getNumBanos(): ?int
    {
        return $this->numBanos;
    }

    public function setNumBanos(int $numBanos): self
    {
        $this->numBanos = $numBanos;

        return $this;
    }

    public function getNumHab(): ?int
    {
        return $this->numHab;
    }

    public function setNumHab(int $numHab): self
    {
        $this->numHab = $numHab;

        return $this;
    }

    public function getTelevision(): ?bool
    {
        return $this->television;
    }

    public function setTelevision(bool $television): self
    {
        $this->television = $television;

        return $this;
    }

    public function getAmueblado(): ?bool
    {
        return $this->amueblado;
    }

    public function setAmueblado(bool $amueblado): self
    {
        $this->amueblado = $amueblado;

        return $this;
    }

    public function getLlaveDormitorio(): ?bool
    {
        return $this->llaveDormitorio;
    }

    public function setLlaveDormitorio(bool $llaveDormitorio): self
    {
        $this->llaveDormitorio = $llaveDormitorio;

        return $this;
    }

    public function getCalefaccion(): ?bool
    {
        return $this->calefaccion;
    }

    public function setCalefaccion(bool $calefaccion): self
    {
        $this->calefaccion = $calefaccion;

        return $this;
    }

    public function getAscensor(): ?bool
    {
        return $this->ascensor;
    }

    public function setAscensor(bool $ascensor): self
    {
        $this->ascensor = $ascensor;

        return $this;
    }

    public function getAireAcond(): ?bool
    {
        return $this->aireAcond;
    }

    public function setAireAcond(bool $aireAcond): self
    {
        $this->aireAcond = $aireAcond;

        return $this;
    }

    public function getExterior(): ?bool
    {
        return $this->exterior;
    }

    public function setExterior(bool $exterior): self
    {
        $this->exterior = $exterior;

        return $this;
    }

    public function getGaraje(): ?bool
    {
        return $this->garaje;
    }

    public function setGaraje(bool $garaje): self
    {
        $this->garaje = $garaje;

        return $this;
    }

    public function getLavadora(): ?bool
    {
        return $this->lavadora;
    }

    public function setLavadora(bool $lavadora): self
    {
        $this->lavadora = $lavadora;

        return $this;
    }

    public function getInternet(): ?bool
    {
        return $this->internet;
    }

    public function setInternet(bool $internet): self
    {
        $this->internet = $internet;

        return $this;
    }

    public function getPlaya(): ?bool
    {
        return $this->playa;
    }

    public function setPlaya(bool $playa): self
    {
        $this->playa = $playa;

        return $this;
    }

    public function getCocinaEquipada(): ?bool
    {
        return $this->cocinaEquipada;
    }

    public function setCocinaEquipada(bool $cocinaEquipada): self
    {
        $this->cocinaEquipada = $cocinaEquipada;

        return $this;
    }

    public function getLuminoso(): ?bool
    {
        return $this->luminoso;
    }

    public function setLuminoso(bool $luminoso): self
    {
        $this->luminoso = $luminoso;

        return $this;
    }


}
