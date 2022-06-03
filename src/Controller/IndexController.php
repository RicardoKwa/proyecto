<?php
//src/Controller/IndexController.php
namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;


use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Ciudad;
use App\Entity\User;
use App\Entity\Reserva;
use App\Entity\Estancia;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Session\Session;
// use App\Manager\AuthManager;

class IndexController extends AbstractController {
/**
* @Route("/inicio")
*/
public function inicio(Request $request) {
    $session = $request->getSession();
    $session->clear();
       return $this->render('proyecto.html.twig',array());
       
}
     
/**
     * @Route("/pisos", methods={"GET"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
public function pisos(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
    
    // $request = Request::createFromGlobals();

// the URI being requested (e.g. /about) minus any query parameters
    // $request->getPathInfo();

    $nombre = $request->query->get('ciudad');
    
    $queryId=$entityManager->createQuery("select c.idCiudad from App\Entity\Ciudad c WHERE c.nombre = :nombre");
    $queryId->setParameter('nombre', $nombre);          
    $id_ciudad = $queryId->getResult();

    $queryPisos=$entityManager->createQuery("select e from App\Entity\Estancia e WHERE e.idCiudad = :id_ciudad");
    $queryPisos->setParameter('id_ciudad', $id_ciudad);
    $pisos = $queryPisos->getResult();
        
    $data = $serializer->serialize($pisos, JsonEncoder::FORMAT);
    return new JsonResponse($data, Response::HTTP_OK, [], true); 
    }
  
/**
 * @Route("/car", methods={"GET"})
 * @return JsonResponse
 * @throws \Exception
 */
public function car(EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
        
    $queryCar=$entityManager->createQuery("select e from App\Entity\Caracteristicas_piso e");
    $car = $queryCar->getResult();
        
    $data = $serializer->serialize($car, JsonEncoder::FORMAT);
    return new JsonResponse($data, Response::HTTP_OK, [], true); 
    }


/**
 * @Route("/prueba", methods={"POST"})
 * @return JsonResponse
 * @throws \Exception
 */
public function prueba(Request $request,EntityManagerInterface $entityManager, UserPasswordHasherInterface $userPasswordHasher): JsonResponse
{   

    $factory = new PasswordHasherFactory([
        'common' => ['algorithm' => 'bcrypt'],
        'memory-hard' => ['algorithm' => 'sodium'],
    ]);
    $passwordHasher = $factory->getPasswordHasher('common');

    $data  = json_decode(file_get_contents('php://input'), true);        
   
    $user = new User();
    $user->setEmail($data['email']);
    $user->setNombre($data['nombre']);
    $user->setPApellido($data['papellido']);
    $user->setSApellido($data['sapellido']);   
    $user->setRoles(array('ROLE_USER'));
    // $user->setPassword( $data['password']);
    $hash = $passwordHasher->hash($data['password']);
    $user->setPassword($hash);
        
        // $hash = $passwordHasher->hash('plain');
        // $data['password'])


    
    
    // Retrieve the right password hasher by its name
    // $passwordHasher = $factory->getPasswordHasher('common');
    
    // Hash a plain password
    // $hash = $passwordHasher->hash('plain'); // returns a bcrypt hash
    
    // // Verify that a given plain password matches the hash
    // $passwordHasher->verify($hash, 'wrong'); // returns false
    // $passwordHasher->verify($hash, 'plain'); // returns true (valid)

    
    // $userPasswordHasher->hashPassword(
    //     $user,
    //     $data['password']
    //     //$form->get('plainPassword')->getData()
    // )
    // );
    // $user->setIsVerified(false);

    $entityManager->persist($user);
    $entityManager->flush();
        
        // do anything else you need here, like send an email

    return new JsonResponse($data['nombre'], Response::HTTP_OK, [], true); //modificar , voy a devolver un json o un string
    //}

}

/**
 * @Route("/reservar", methods={"POST"})
 * @return JsonResponse
 * @throws \Exception
 */
public function reservar(Request $request,EntityManagerInterface $entityManager)
{   
    $session = $request->getSession();
    $data  = json_decode(file_get_contents('php://input'), true);        
    
    $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $session->get('email')]);
    $estancia = $entityManager->getRepository(Estancia::class)->findOneBy(['idEst' => $data['pisoId']]);
    $inicio = \DateTime::createFromFormat('Y-m-d', $data['dateIn']); 
    $fin = \DateTime::createFromFormat('Y-m-d', $data['dateFin']); 

    $reserva = new Reserva();
    $reserva->setPrecioAlquiler(200);
    $reserva->setFechaInicio($inicio);
    $reserva->setFechaFinal($fin);
    $reserva->setNumeroCuenta($data['numtarjeta']);
    $reserva->setIdCliente($user);
    $reserva->setIdEst($estancia);

    try {
        $entityManager->persist($reserva);
        $entityManager->flush();
    } catch (\Exception $e) {
        
        return new JsonResponse("Error", Response::HTTP_OK, [], true);

    }
    // return new JsonResponse($data['pisoId'], Response::HTTP_OK, [], true);
    
    return new JsonResponse($reserva->getNumeroCuenta(), Response::HTTP_OK, [], true);
    // if($entityManager->persist($reserva)){
        
        
    // }else{
    //     return new JsonResponse("Error", Response::HTTP_OK, [], true);
    // }
    
    
        
        // do anything else you need here, like send an email

     //modificar , voy a devolver un json o un string
    //}

}

    
//  }


//  public function checkPassword($password, UserInterface $user): bool
//  {
//      return $this->passwordEncoder->isPasswordValid($user, $password);
//  }


/**
     * @Route("/reservas", methods={"GET"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function getReservas(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
    
        // $request = Request::createFromGlobals();
    
    // the URI being requested (e.g. /about) minus any query parameters
        // $request->getPathInfo();
        $session = $request->getSession();
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $session->get('email')]);
        // $nombre = $request->query->get('ciudad');
        
        // $queryId=$entityManager->createQuery("select c.idCiudad from App\Entity\Ciudad c WHERE c.nombre = :nombre");
        // $queryId->setParameter('nombre', $nombre);          
        // $id_ciudad = $queryId->getResult();
    
        $queryReservas=$entityManager->createQuery("select e from App\Entity\Reserva e WHERE e.idCliente = :user");
        $queryReservas->setParameter('user', $user);
        $reservas = $queryReservas->getResult();
            
        $data = $serializer->serialize($reservas, JsonEncoder::FORMAT);
        return new JsonResponse($data, Response::HTTP_OK, [], true); 
        }

      
      

        
/**
 * @Route("/filtroPisos", methods={"POST"})
 * @return JsonResponse
 * @throws \Exception
 */
    public function filtro(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
    
        // $request = Request::createFromGlobals();
        $data  = json_decode(file_get_contents('php://input'), true);        
        
        // $nombre = $data['city'];
        $tipo = $data['tipo'];
        $ciudad = $entityManager->getRepository(Ciudad::class)->findOneBy(['nombre' => $data['city']]);

        // $queryId=$entityManager->createQuery("select c.idCiudad from App\Entity\Ciudad c WHERE c.nombre = :nombre");
        // $queryId->setParameter('nombre', $nombre);          
        // $id_ciudad = $queryId->getResult();
    
        $queryPisos=$entityManager->createQuery("select e from App\Entity\Estancia e WHERE e.idCiudad = :ciudad AND e.tipoEst = :tipo");
        $queryPisos->setParameter('ciudad', $ciudad);
        $queryPisos->setParameter('tipo', $tipo);
        $pisos = $queryPisos->getResult();
            
        $data = $serializer->serialize($pisos, JsonEncoder::FORMAT);
        return new JsonResponse($data, Response::HTTP_OK, [], true); 
        }




/**
 * @Route("/comprobarDisponible", methods={"POST"})
 * @return JsonResponse
 * @throws \Exception
 */
public function disponibilidad(Request $request , EntityManagerInterface $entityManager) {
    
    // $request = Request::createFromGlobals();
    $data  = json_decode(file_get_contents('php://input'), true);        
    
    $estancia = $entityManager->getRepository(Estancia::class)->findOneBy(['idEst' => $data['pisoId']]);
    $inicio = \DateTime::createFromFormat('Y-m-d', $data['dateIn']); 
    $fin = \DateTime::createFromFormat('Y-m-d', $data['dateFin']); 
    // $nombre = $data['city'];
    
    $reservas = $entityManager->getRepository(Reserva::class)->findBy(['idEst' => $estancia]);
    
    if (sizeof($reservas) == 0) {
        return new JsonResponse('Disponible', Response::HTTP_OK, [], true); 
        // return $this->errorJsonResponse('users with given ids not found');///COPIAR ESE ERRORJSON Y LUEGO CAMBIAR
    }
    else{
    
        foreach($reservas as $res)
        {   
            $t0 = $res->getFechaInicio();
            $t1 = $res->getFechaFinal();
            if($t0 <= $inicio && $t1 > $inicio || $t0 >$inicio && $t0 < $fin ){
                return new JsonResponse('No disponible', Response::HTTP_OK, [], true); 
            }    
        }
            return new JsonResponse('Disponible', Response::HTTP_OK, [], true); 

    }

    }





    /**
     * @Route("/reservascliente", methods={"GET"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function getReservasCliente(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
    
        $id_cliente = $request->query->get('id');
            
        $user = $entityManager->getRepository(User::class)->findOneBy(['id' => $id_cliente]);
    
        $queryReservas=$entityManager->createQuery("select e from App\Entity\Reserva e WHERE e.idCliente = :user");
        $queryReservas->setParameter('user', $user);
        $reservas = $queryReservas->getResult();
            
        $data = $serializer->serialize($reservas, JsonEncoder::FORMAT);
        return new JsonResponse($data, Response::HTTP_OK, [], true); 
        }



}


