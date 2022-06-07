<?php
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
use App\Entity\ConjuntoReglas;
use App\Entity\CaracteristicasPiso;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Session\Session;


class AdminController extends AbstractController {

/**
     * @Route("/reservasAdmin", methods={"GET"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function getAllReservas(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {

        $reservas = $entityManager->getRepository(Reserva::class)->findAll();
        $data = $serializer->serialize($reservas, JsonEncoder::FORMAT);
        return new JsonResponse($data, Response::HTTP_OK, [], true); 
    }



/**
* @Route("/pisosAdmin", methods={"GET"})
* @param Request $request
* @return JsonResponse
* @throws \Exception
*/
public function getAllpisos(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
    

    $pisos = $entityManager->getRepository(Estancia::class)->findAll();
    $data = $serializer->serialize($pisos, JsonEncoder::FORMAT);
    return new JsonResponse($data, Response::HTTP_OK, [], true); 
}

/**
* @Route("/clientesAdmin", methods={"GET"})
* @param Request $request
* @return JsonResponse
* @throws \Exception
*/
public function getAllUser(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
    
    $Users = $entityManager->getRepository(User::class)->findAll();
    $data = $serializer->serialize($Users, JsonEncoder::FORMAT);
    return new JsonResponse($data, Response::HTTP_OK, [], true); 
}


    /**
     * @Route("/deletereserva", methods={"GET"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function deleteReserva(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
        
        $id_reserva = $request->query->get('id');
      
        $reserva = $entityManager->getRepository(Reserva::class)->findOneBy(['idRes' => $id_reserva]);

        $entityManager->remove($reserva);
        $entityManager->flush();

        return new JsonResponse('Reserva eliminada', Response::HTTP_OK, [], true);     

    }
  
    /**
     * @Route("/deletepiso", methods={"GET"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function deletePiso(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
        
        $id_piso = $request->query->get('id');           
        $piso = $entityManager->getRepository(Estancia::class)->findOneBy(['idEst' => $id_piso]);
        $entityManager->remove($piso);
        $entityManager->flush();

        return new JsonResponse('Piso eliminado', Response::HTTP_OK, [], true);     
    }
    
/**
     * @Route("/newpiso", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function editPiso(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
        
        $data  = json_decode(file_get_contents('php://input'), true);  

        $piso = new Estancia();

        $piso->setTipoEst($data['tipo']);
        $piso->setPrecioMes($data['precio-mes']);
        $piso->setFianza($data['fianza']);
        $piso->setDireccion($data['direccion']);
        $piso->setIdCar($data['car']);
        $piso->setIdReg($data['reglas']);
        $piso->setLatitud(floatval($data['lat']));
        $piso->setLongitud(floatval($data['long']));
        
        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse('Piso creado', Response::HTTP_OK, [], true);     
    }

    
    /**
     * @Route("/editcliente", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function editCliente(EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
        
            
        $factory = new PasswordHasherFactory([
            'common' => ['algorithm' => 'bcrypt'],
            'memory-hard' => ['algorithm' => 'sodium'],
        ]);
        $passwordHasher = $factory->getPasswordHasher('common');


        $data  = json_decode(file_get_contents('php://input'), true);  

        

        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        $user->setEmail($data['email']);
        $user->setNombre($data['nombre']);
        $user->setPApellido($data['papellido']);
        $user->setSApellido($data['sapellido']);   

        if($data['password'] !== ''){
            $hash = $passwordHasher->hash($data['password']);
            $user->setPassword($hash);
        }

        
        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse('Cliente editado', Response::HTTP_OK, [], true);     
    }
    

    /**
     * @Route("/deletecliente", methods={"GET"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function deleteCliente(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
        
        $id_cliente = $request->query->get('id');            
        $user = $entityManager->getRepository(User::class)->findOneBy(['id' => $id_cliente]);
        $email = $user->getEmail();
        $entityManager->remove($user);
        $entityManager->flush();

        return new JsonResponse('Usuario: ' + $email + 'eliminado', Response::HTTP_OK, [], true);     
    }
    
    /**
     * @Route("/filtrar", methods={"GET"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function filtrar(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
        
        $tipo = $request->query->get('t');
        
        if($tipo == "piso"){
        
            $direccion = $request->query->get('dir');
    
            $queryPisos=$entityManager->createQuery("select e from App\Entity\Estancia e WHERE e.direccion = :dir");
            $queryPisos->setParameter('dir', $direccion);
            $pisos = $queryPisos->getResult(); 
            if(!empty($pisos)){
                $data = $serializer->serialize($pisos, JsonEncoder::FORMAT);
            }else{
                $data = $serializer->serialize("No existe", JsonEncoder::FORMAT);
            }
            

        }else{

            $email = $request->query->get('email');
            $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
                
            if(!empty($user)){
               
                if($tipo == "reserva"){
                    $queryReservas=$entityManager->createQuery("select e from App\Entity\Reserva e WHERE e.idCliente = :user");
                    $queryReservas->setParameter('user', $user);
                    $reservas = $queryReservas->getResult();  
                    $data = $serializer->serialize($reservas, JsonEncoder::FORMAT);
                    return new JsonResponse($data, Response::HTTP_OK, [], true);                       
                }else{
                    $data = $serializer->serialize($user, JsonEncoder::FORMAT);
                    // return new JsonResponse($data, Response::HTTP_OK, [], true); 
                }               
            }else{
                    $data = $serializer->serialize("No existe", JsonEncoder::FORMAT);
            }

        }

        return new JsonResponse($data, Response::HTTP_OK, [], true); 
 
    }


    /**
     * @Route("/newPiso", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function insertPiso(EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
        
        $data  = json_decode(file_get_contents('php://input'), true);  
        
        $ciudad = $entityManager->getRepository(Ciudad::class)->findOneBy(['idCiudad' => intval($data['city'])]);

        if($data['playa'] == "Si"){
            if($data['car'] == "completo"){
                $car = $entityManager->getRepository(CaracteristicasPiso::class)->findOneBy(['idCar' => 3]);
            }else{
                $car = $entityManager->getRepository(CaracteristicasPiso::class)->findOneBy(['idCar' => 4]);
            }
        }else{
            if($data['car'] == "completo"){
                $car = $entityManager->getRepository(CaracteristicasPiso::class)->findOneBy(['idCar' => 1]);
            }else{
                $car = $entityManager->getRepository(CaracteristicasPiso::class)->findOneBy(['idCar' => 2]);
            }

        }

        $queryReglas=$entityManager->createQuery("select e from App\Entity\ConjuntoReglas e WHERE e.parejas = :parejas AND e.mascotas = :mascotas AND e.fiestas = :fiestas AND e.fumar = :fumar");
        $queryReglas->setParameter('parejas', $data['parejas']);
        $queryReglas->setParameter('mascotas', $data['mascotas']);
        $queryReglas->setParameter('fiestas', $data['fiestas']);
        $queryReglas->setParameter('fumar', $data['fumar']);
        $reglas = $queryReglas->getResult();
        
        if($data['idPiso'] == 'New'){
            $piso = new Estancia();
        }else{
            $piso = $entityManager->getRepository(Estancia::class)->findOneBy(['idEst' => intval($data['idPiso'])]);
        }

        //imagenes

        $queryImagenes=$entityManager->createQuery("select e from App\Entity\Imagenes e WHERE e.nombre = :nombre");
        $queryImagenes->setParameter('nombre', $data['im']);
        $imagenes = $queryImagenes->getResult();
        
        $piso->setTipoEst($data['tipo']);
        $piso->setDireccion($data['dir']);
        $piso->setPrecioMes(floatval($data['precio']));
        $piso->setFianza(floatval($data['fianza']));
        $piso->setIdCiudad($ciudad);
        $piso->setIdCar($car);
        $piso->setIdReg($reglas[0]);
        $piso->setLatitud(floatval($data['lat']));
        $piso->setLongitud(floatval($data['long']));
        if(!empty($imagenes)){
            $piso->setIdImg($imagenes[0]);
        }else{
            return new JsonResponse("No Image", Response::HTTP_OK, [], true);     
        }

        $entityManager->persist($piso);
        $entityManager->flush();

        return new JsonResponse("OK", Response::HTTP_OK, [], true);     
    }
    
}
