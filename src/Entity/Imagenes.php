<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Imagenes
 *
 * @ORM\Table(name="imagenes", uniqueConstraints={@ORM\UniqueConstraint(name="nombre", columns={"nombre"})})
 * @ORM\Entity
 */
class Imagenes
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="bigint", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="nombre", type="string", length=100, nullable=false)
     */
    private $nombre;

    /**
     * @var string
     *
     * @ORM\Column(name="principal", type="string", length=100, nullable=false)
     */
    private $principal;

    /**
     * @var string
     *
     * @ORM\Column(name="swip1", type="string", length=100, nullable=false)
     */
    private $swip1;

    /**
     * @var string
     *
     * @ORM\Column(name="swip2", type="string", length=100, nullable=false)
     */
    private $swip2;

    /**
     * @var string
     *
     * @ORM\Column(name="swip3", type="string", length=100, nullable=false)
     */
    private $swip3;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): self
    {
        $this->nombre = $nombre;

        return $this;
    }

    public function getPrincipal(): ?string
    {
        return $this->principal;
    }

    public function setPrincipal(string $principal): self
    {
        $this->principal = $principal;

        return $this;
    }

    public function getSwip1(): ?string
    {
        return $this->swip1;
    }

    public function setSwip1(string $swip1): self
    {
        $this->swip1 = $swip1;

        return $this;
    }

    public function getSwip2(): ?string
    {
        return $this->swip2;
    }

    public function setSwip2(string $swip2): self
    {
        $this->swip2 = $swip2;

        return $this;
    }

    public function getSwip3(): ?string
    {
        return $this->swip3;
    }

    public function setSwip3(string $swip3): self
    {
        $this->swip3 = $swip3;

        return $this;
    }


}
