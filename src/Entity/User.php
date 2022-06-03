<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * User
 *
 * @ORM\Table(name="user", uniqueConstraints={@ORM\UniqueConstraint(name="UNIQ_8D93D649E7927C74", columns={"email"})})
 * @ORM\Entity
 */
class User
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
     * @ORM\Column(name="p_apellido", type="string", length=100, nullable=false)
     */
    private $pApellido;

    /**
     * @var string
     *
     * @ORM\Column(name="s_apellido", type="string", length=100, nullable=false)
     */
    private $sApellido;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=180, nullable=false)
     */
    private $email;

    /**
     * @var array
     *
     * @ORM\Column(name="roles", type="json", nullable=false)
     */
    private $roles;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", length=255, nullable=false)
     */
    private $password;

    // /**
    //  * @var bool|null
    //  *
    //  * @ORM\Column(name="isVerified", type="boolean", nullable=true, options={"default"="b'0'"})
    //  */
    // private $isverified = 'b\'0\'';

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

    public function getPApellido(): ?string
    {
        return $this->pApellido;
    }

    public function setPApellido(string $pApellido): self
    {
        $this->pApellido = $pApellido;

        return $this;
    }

    public function getSApellido(): ?string
    {
        return $this->sApellido;
    }

    public function setSApellido(string $sApellido): self
    {
        $this->sApellido = $sApellido;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getRoles(): ?array
    {
        return $this->roles;
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    // public function getIsverified(): ?bool
    // {
    //     return $this->isverified;
    // }

    // public function setIsverified(?bool $isverified): self
    // {
    //     $this->isverified = $isverified;

    //     return $this;
    // }


}
