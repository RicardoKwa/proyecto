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

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Session\Session;
class SecurityController extends AbstractController
{

 /**
 * @Route("/login", methods={"POST"})
 * @return JsonResponse
 * @throws \Exception
 */

public function login(Request $request , EntityManagerInterface $entityManager ,UserPasswordHasherInterface $userPasswordHasher)
 {   

    $factory = new PasswordHasherFactory([
        'common' => ['algorithm' => 'bcrypt'],
        'memory-hard' => ['algorithm' => 'sodium'],
    ]);
    $passwordHasher = $factory->getPasswordHasher('common');


    $data  = json_decode(file_get_contents('php://input'), true);

     $username = $data['email'];
     $password = $data['password'];
     
     $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $username]);
     if($user){
        
        $hash = $user->getPassword();

        if ($passwordHasher->verify($hash,$password)) {
            $roles = $user->getRoles();
            $session = new Session();
            $session->set('email',$username);
            $session->set('id', $user->getId());
            if($roles[0] == 'ROLE_ADMIN'){
                return new JsonResponse('ADMIN', Response::HTTP_OK, [], true); 
            }elseif ($roles[0] == 'ROLE_USER') {
                return new JsonResponse($session->get('email'), Response::HTTP_OK, [], true); 
            }  
         }
        return new JsonResponse('PasswordError', Response::HTTP_OK, [], true); 
     }else{
        return new JsonResponse('UserError', Response::HTTP_OK, [], true); 
     }

    
 }


 /**
 * @Route("/register", methods={"POST"})
 * @return JsonResponse
 * @throws \Exception
 */
public function register(Request $request,EntityManagerInterface $entityManager, UserPasswordHasherInterface $userPasswordHasher): JsonResponse
{   

    $factory = new PasswordHasherFactory([
        'common' => ['algorithm' => 'bcrypt'],
        'memory-hard' => ['algorithm' => 'sodium'],
    ]);
    $passwordHasher = $factory->getPasswordHasher('common');

    $data  = json_decode(file_get_contents('php://input'), true);        
    
    $check = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);
    if(empty($check)){
        $user = new User();
        $user->setEmail($data['email']);
        $user->setNombre($data['nombre']);
        $user->setPApellido($data['papellido']);
        $user->setSApellido($data['sapellido']);   
        $user->setRoles(array('ROLE_USER'));
        $hash = $passwordHasher->hash($data['password']);
        $user->setPassword($hash);
            
    
        $entityManager->persist($user);
        $entityManager->flush();
    
        $session = new Session();
        $session->set('email',$user->getEmail());
        $session->set('id', $user->getId());
    
        return new JsonResponse("OK", Response::HTTP_OK, [], true);
    }else{
        return new JsonResponse("Este email ya está registrado", Response::HTTP_OK, [], true);
    }

}

    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }


#[Route(path: '/check', name: 'app_check')]
public function check(Request $request , EntityManagerInterface $entityManager):JsonResponse
 {   
    $session = $request->getSession();


    if($session->get('email')){     
        return new JsonResponse($session->get('email'), Response::HTTP_OK, [], true); 
    }else{
        return new JsonResponse("False", Response::HTTP_OK, [], true);
    }


    
    
    
 }

}
