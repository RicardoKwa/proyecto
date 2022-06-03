<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ConjuntoReglas
 *
 * @ORM\Table(name="conjunto_reglas")
 * @ORM\Entity
 */
class ConjuntoReglas
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_reg", type="bigint", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idReg;

    /**
     * @var bool|null
     *
     * @ORM\Column(name="parejas", type="boolean", nullable=true, options={"default"="b'0'"})
     */
    private $parejas = 'b\'0\'';

    /**
     * @var bool|null
     *
     * @ORM\Column(name="mascotas", type="boolean", nullable=true, options={"default"="b'0'"})
     */
    private $mascotas = 'b\'0\'';

    /**
     * @var bool|null
     *
     * @ORM\Column(name="fiestas", type="boolean", nullable=true, options={"default"="b'0'"})
     */
    private $fiestas = 'b\'0\'';

    /**
     * @var bool|null
     *
     * @ORM\Column(name="fumar", type="boolean", nullable=true, options={"default"="b'0'"})
     */
    private $fumar = 'b\'0\'';

    public function getIdReg(): ?string
    {
        return $this->idReg;
    }

    public function getParejas(): ?bool
    {
        return $this->parejas;
    }

    public function setParejas(?bool $parejas): self
    {
        $this->parejas = $parejas;

        return $this;
    }

    public function getMascotas(): ?bool
    {
        return $this->mascotas;
    }

    public function setMascotas(?bool $mascotas): self
    {
        $this->mascotas = $mascotas;

        return $this;
    }

    public function getFiestas(): ?bool
    {
        return $this->fiestas;
    }

    public function setFiestas(?bool $fiestas): self
    {
        $this->fiestas = $fiestas;

        return $this;
    }

    public function getFumar(): ?bool
    {
        return $this->fumar;
    }

    public function setFumar(?bool $fumar): self
    {
        $this->fumar = $fumar;

        return $this;
    }


}
